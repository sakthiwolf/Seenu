import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Menu, MenuItem, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { fetchSellerOrders, updateOrderStatus } from '../../../Redux Toolkit/Seller/sellerOrderSlice';
import { type Order, type OrderItem } from '../../../types/orderTypes';
import { API_URL } from '../../../Config/Api';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const orderStatus = [
  { color: '#FFA500', label: 'PENDING' }, 
  { color: '#F5BCBA', label: 'PLACED' }, 
  { color: '#F5BCBA', label: 'CONFIRMED' },
  { color: '#1E90FF', label: 'SHIPPED' }, 
   { color: '#32CD32', label: 'DELIVERED' }, 
   { color: '#FF0000', label: 'CANCELLED' },

];
const orderStatusColor = {
  PENDING: { color: '#FFA500', label: 'PENDING' }, // Orange
  CONFIRMED:{ color: '#F5BCBA', label: 'CONFIRMED' },
  PLACED:{ color: '#F5BCBA', label: 'PLACED' }, 
  SHIPPED: { color: '#1E90FF', label: 'SHIPPED' }, // DodgerBlue
  DELIVERED: { color: '#32CD32', label: 'DELIVERED' }, // LimeGreen
  CANCELLED: { color: '#FF0000', label: 'CANCELLED' } // Red
};

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><rect width='100%25' height='100%25' fill='%23e5e7eb'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-size='12'>No Image</text></svg>";

const resolveImageUrl = (src?: string) => {
  if (!src) return FALLBACK_IMAGE;
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:') || src.startsWith('blob:')) {
    return src;
  }
  const normalized = src.replace(/\\/g, '/').replace(/^\/+/, '');
  return `${API_URL}/${encodeURI(normalized)}`;
};

export default function OrderTable() {

  const { sellerOrder } = useAppSelector(store => store);
  const dispatch = useAppDispatch();
  const orders = Array.isArray(sellerOrder?.orders) ? sellerOrder.orders : [];

  const [anchorEl, setAnchorEl] = React.useState<Record<string, HTMLElement | null>>({});

  const handleClick = (event: React.MouseEvent<HTMLElement>, orderId: string) => {
    setAnchorEl((prev) => ({ ...prev, [orderId]: event.currentTarget }));
  };

  const handleClose = (orderId: string) => {
    setAnchorEl((prev) => ({ ...prev, [orderId]: null }));
  };

  React.useEffect(() => {
    dispatch(fetchSellerOrders(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  const handleUpdateOrder = (orderId: string, orderStatus: any) => {
    dispatch(updateOrderStatus({
      jwt: localStorage.getItem("jwt") || "",
      orderId,
      orderStatus,
    }));
    handleClose(orderId);
  };

  return (
    <>
      <h1 className='pb-5 font-bold text-xl'>All Orders</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order Id</StyledTableCell>
              <StyledTableCell>Products</StyledTableCell>
              <StyledTableCell>Shipping Address</StyledTableCell>
              <StyledTableCell align="right">Order Status</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((item: Order) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell align="left">{item._id}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <div className='flex gap-1 flex-wrap'>
                    {item.orderItems?.map((orderItem: OrderItem) =>
                      <div key={orderItem._id} className='flex gap-5'>
                        <img
                          className='w-20 rounded-md'
                          src={resolveImageUrl(orderItem.product?.images?.[0])}
                          alt={orderItem.product?.title || "Product image"}
                          onError={(e) => {
                            e.currentTarget.src = FALLBACK_IMAGE;
                          }}
                        />
                        <div className='flex flex-col justify-between py-2'>
                          <h1>Title: {orderItem.product?.title}</h1>
                          <h1>Price: Rs.{orderItem.product?.sellingPrice}</h1>
                          <h1>Color: {orderItem.product?.color}</h1>
                          <h1>Size: {orderItem.size}</h1>
                        </div>
                      </div>
                    )}
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <div className='flex flex-col gap-y-2'>
                    <h1>{item.shippingAddress?.name}</h1>
                    <h1>{item.shippingAddress?.address}, {item.shippingAddress?.city}</h1>
                    <h1>{item.shippingAddress?.state} - {item.shippingAddress?.pinCode}</h1>
                    <h1><strong>Mobile:</strong> {item.shippingAddress?.mobile}</h1>
                  </div>
                </StyledTableCell>
                {(() => {
                  const statusMeta = orderStatusColor[item.orderStatus as keyof typeof orderStatusColor] ?? {
                    color: '#6b7280',
                    label: String(item.orderStatus || 'UNKNOWN'),
                  };
                  return (
                    <StyledTableCell sx={{ color: statusMeta.color }} align="center">
                      <Box sx={{ borderColor: statusMeta.color }} className="border px-2 py-1 rounded-full text-xs">
                        {statusMeta.label}
                      </Box>
                    </StyledTableCell>
                  );
                })()}
                <StyledTableCell align="right">
                  <Button
                    size='small'
                    onClick={(e) => handleClick(e, item._id)}
                    color='primary'
                    className='bg-primary-color'>
                    Status
                  </Button>
                  <Menu
                    id={`status-menu ${item._id}`}
                    anchorEl={anchorEl[item._id]}
                    open={Boolean(anchorEl[item._id])}
                    onClose={() => handleClose(item._id)}
                    MenuListProps={{
                      'aria-labelledby': `status-menu ${item._id}`,
                    }}
                  >
                    {orderStatus.map((status) =>
                      <MenuItem 
                      key={status.label} 
                      onClick={() => handleUpdateOrder(item._id, status.label)}>
                        {status.label}</MenuItem>
                    )}
                  </Menu>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
