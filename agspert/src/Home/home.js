import SaleModal from "../Components/modal";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useActive } from "../Context/activeSaleContext";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "./home.css";
import SaleTable from "../Components/table";
import ThemeToggle from "../Components/themeToggle";

export default function Home() {
  const [products, setProducts] = useState([]);

  const [options, setOptions] = useState([]);
  const { state, dispatch } = useActive();
  const [activeSaleData, setActiveSaleData] = useState(null);
  const [completeSaleTable, setCompleteSaleTable] = useState(false);
  const [initialData, setInitialData] = useState(null);

  const fetchProducts = async () => {
    const response = await axios.get(
      `${process.env.PUBLIC_URL}/productSchema.json`
    );
    return response.data;
  };

  const fetchCompleteOrder = async () => {
    const response = await axios.get(
      `${process.env.PUBLIC_URL}/saleOderSchema.json`
    );
    return response.data;
  };

  const { data: order, refetch: refetchCompletedOrders } = useQuery({
    queryKey: ["completeOrder"],
    queryFn: fetchCompleteOrder,
    enabled: false,
  });

  const { data, refetch: refetchSaleOrder } = useQuery({
    queryKey: ["saleOrder"],
    queryFn: fetchProducts,
    enabled: false,
    onError: (error) => {
      console.error("Error fetching complete orders:", error);
    },
  });

  const isArray = (data) => {
    if (Array.isArray(data)) return data;
    if (data !== null && typeof data === "object") return [data];
    return [];
  };

  const orders = isArray(order);

  const ensureArray = (data) => {
    if (Array.isArray(data)) return data;
    if (data !== null && typeof data === "object") return [data];
    return [];
  };

  const productsData = ensureArray(data);
  const getOptions = () => {
    if (productsData.length > 0 && productsData[0].sku) {
      const newOptions = productsData[0].sku.map((item) => ({
        label: item.name,
        value: item.id.toString(),
      }));
      setOptions(newOptions);
    } else {
      setOptions([]);
    }
  };

  const {
    isOpen: isOpenSaleOrder,
    onOpen: onOpenSaleOrder,
    onClose: onCloseSaleOrder,
  } = useDisclosure({
    onOpen: () => {
      getOptions();
      setInitialData(null);

      setProducts([]);
      reset();
    },
    onClose: () => {
      setOptions([]);
    },
  });
  const {
    isOpen: isOpenActiveSale,
    onOpen: onOpenActiveSale,
    onClose: onCloseActiveSale,
  } = useDisclosure({
    onClose: () => {
      setInitialData(null);

      setProducts([]);
    },
    onOpen: () => {
      getOptions();
    },
  });
  const {
    isOpen: isOpenCompleteSale,
    onOpen: onOpenCompleteSale,
    onClose: onCloseCompleteSale,
  } = useDisclosure({
    onClose: () => {
      setInitialData(null);

      setProducts([]);
      reset();
    },
    onOpen: () => {
      getOptions();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const saleOrderHandler = () => {
    onOpenSaleOrder();
    refetchSaleOrder();
  };

  const onSubmitSaleOrder = (formData) => {
    console.log({ formData });
    const data = {
      ...formData,
      id: uuidv4(),
      date: format(new Date(), "yyyy-mm-dd h:mmaaa").toLowerCase(),
      product: products,
    };
    dispatch({ type: "SALE_ORDER", payload: data });

    onCloseSaleOrder();
    reset();
  };

  console.log(state.activeSaleOrder);

  const onSubmitActiveSale = (formData) => {
    const editedData = {
      ...activeSaleData,
      ...formData,
      date: format(new Date(), "yyyy-mm-dd h:mmaaa").toLowerCase(),
      product: products,
    };
    dispatch({ type: "UPDATE_SALE_ORDER", payload: editedData });

    reset();
    setProducts([]);
    onCloseActiveSale();

    console.log(state.activeSaleOrder);
  };

  const editHandler = (id) => {
    const saleorder = state.activeSaleOrder.find(
      (product) => product.id === id
    );
    setActiveSaleData(saleorder);
    setProducts(saleorder.product);
    onOpenActiveSale();
  };

  const completSalOrderHandler = () => {
    setCompleteSaleTable(true);
    refetchCompletedOrders();
  };

  const activSaleOrderHandler = () => {
    setCompleteSaleTable(false);
  };

  const viewHandler = (id) => {
    const complteOrder = orders.find((product) => product.id === id);
    setInitialData(complteOrder);
    setProducts(complteOrder.product);
    onOpenCompleteSale();
  };

  console.log(orders);
  return (
    <div className="home-container">
      <ThemeToggle className="theme-toggle-container" />
      <div className="button-container">
        <Button onClick={activSaleOrderHandler}>Active sale</Button>
        <Button onClick={completSalOrderHandler}>Completed Sale</Button>
        <Button onClick={saleOrderHandler}>+ Sale Order</Button>
      </div>

      {completeSaleTable ? (
        <div className="table-container">
          <SaleTable
            Orders={orders}
            completeSaleTable={completeSaleTable}
            viewHandler={viewHandler}
          />
        </div>
      ) : (
        <div className="table-container">
          <SaleTable
            Orders={state.activeSaleOrder}
            editHandler={editHandler}
            completeSaleTable={completeSaleTable}
          />
        </div>
      )}

      <SaleModal
        className="modal-container"
        isOpen={isOpenSaleOrder}
        onClose={onCloseSaleOrder}
        handleSubmit={handleSubmit(onSubmitSaleOrder)}
        options={options}
        value={products}
        setValue={setProducts}
        register={register}
        errors={errors}
      />
      <SaleModal
        className="modal-container"
        isOpen={isOpenActiveSale}
        onClose={onCloseActiveSale}
        handleSubmit={handleSubmit(onSubmitActiveSale)}
        options={options}
        value={products}
        setValue={setProducts}
        register={register}
        errors={errors}
        initialData={activeSaleData}
      />
      <SaleModal
        className="modal-container"
        isOpen={isOpenCompleteSale}
        onClose={onCloseCompleteSale}
        handleSubmit={handleSubmit}
        options={options}
        value={products}
        setValue={setProducts}
        register={register}
        errors={errors}
        initialData={initialData}
        disableSubmit={true}
      />
    </div>
  );
}
