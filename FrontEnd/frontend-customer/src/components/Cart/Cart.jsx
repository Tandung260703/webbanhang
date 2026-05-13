import "./Cart.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
} from "@mui/material";
import { useContext,useEffect} from "react";
import { GlobalContext } from "../../context/ContainContext.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";

const Cart = () => {
  const {storage, setStorage } = useContext(GlobalContext);
  console.log(storage);
  const changeAmount = (product, derive) => {
    setStorage((prev) =>
      prev.map((item) => {
        if (item.id == product.id) {
          return {
            ...item,
            quantity: derive == "dele" ? item.quantity - 1 : item.quantity + 1,
          };
        }
        return item;
      })
    );
  };
  useEffect(()=>{

  },[storage])
  return (
    <div id="CartPage">
     <Navbar />
      <div id="cartContainer">
        <h1>Your Cart</h1>
        {storage.length>0?(
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>ID mặt hàng</b>
                  </TableCell>
                  <TableCell>
                    <b>Tên hàng hóa</b>
                  </TableCell>
                  <TableCell>
                    <b>Giá trị</b>
                  </TableCell>
                  <TableCell>
                    <b>Số lượng</b>
                  </TableCell>
                  <TableCell>
                    <b>Giảm giá</b>
                  </TableCell>
                  <TableCell>
                    <b>Thành viên</b>
                  </TableCell>
                  <TableCell>
                    <b>Tổng</b>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {storage.map((row) =>
                  row.quantity > 0 ? (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{`${row.price}$`}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.discount}</TableCell>
                      <TableCell>{row.member}</TableCell>
                      <TableCell>{`${
                        Math.round(row.price * row.quantity * 100) / 100
                      }$`}</TableCell>
                      <TableCell>
                        <button
                          className="deleBtn"
                          onClick={() => {
                            changeAmount(row, "dele");
                          }}
                          style={{
                            color: "white",
                            background: "red",
                            fontSize: "10px",
                          }}
                        >
                          Delete
                        </button>
                      </TableCell>
                      <TableCell>
                        <button
                          className="addBtn"
                          onClick={() => {
                            changeAmount(row, "add");
                          }}
                          style={{
                            color: "white",
                            background: "green",
                            fontSize: "10px",
                          }}
                        >
                          Add
                        </button>
                      </TableCell>
                    </TableRow>
                  ) : null
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <h1>No data</h1>
        )}
      </div>
     </div>
  );
};

export default Cart;
