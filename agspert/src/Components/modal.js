import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { MultiSelect } from "chakra-multiselect";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
export default function SaleModal({
  isOpen,
  onClose,
  handleSubmit,
  options,
  value,
  setValue,
  register,
  errors,
  initialData,
  disableSubmit,
}) {
  const styles = useMultiStyleConfig("MultiSelect", {});
  const defaultInitialData = {
    customerName: "",
    sellingPrice: "",
    totalItems: "",
    product: [],
  };
  const data = initialData || defaultInitialData;

  useEffect(() => {
    if (initialData && initialData.product) {
      setValue(initialData.product);
    } else {
      setValue([]);
    }
  }, [initialData, setValue]);

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sale Order</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <MultiSelect
                options={options}
                value={value}
                onChange={setValue}
                label="All Products"
                styles={styles}
              />
              <FormControl>
                <FormLabel>customer Name</FormLabel>
                <Input
                  placeholder="customer name"
                  {...register("customerName", { required: true })}
                  defaultValue={data.customerName}
                />
                {errors.customerName && <span>This field is required</span>}

                <FormLabel>selling price</FormLabel>
                <Input
                  placeholder="selling price"
                  defaultValue={data.sellingPrice}
                  {...register("sellingPrice", { required: true })}
                />
                {errors.sellingPrice && <span>This field is required</span>}
                <FormLabel>Total Items</FormLabel>
                <Input
                  placeholder="total items"
                  defaultValue={data.totalItems}
                  {...register("totalItems", { required: true })}
                />
                {errors.totalItems && <span>This field is required</span>}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" isDisabled={disableSubmit}>
                submit{" "}
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
