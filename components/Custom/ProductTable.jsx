"use client";
import axios from 'axios'
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import { EditIcon } from "../Icons/EditIcon";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { columns, users } from "@/data";
import { EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from 'sonner';
import { mutate } from 'swr';

const statusColorMap = {
  Black: "success",
  Red: "danger",
  Yellow: "warning",
  Blue: "default",
};

export default function ProductTable({ ProductData }) {
  const router = useRouter();
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [selectedProductId, setselectedProductId] = useState(null);
  
  const handleProductDelete = async () => {
    console.log(selectedProductId);
    try {
      const response = await axios.post(`api/admin/deleteProduct`,{ProductId:selectedProductId});
      console.log('Product deleted successfully:', response.data);
      // return response.data;
      console.log(response)
      if(response.status == 200 ){
        mutate('/api/admin/getProduct');
       } else {
        toast("Product not deleted successfully")
       }
      
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const handleDeleteModal = (userId) => {
    setselectedProductId(userId);
    onOpen();
  };

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "Product":
        return <div>{user?.title}</div>;
      case "Category":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.category}
            </p>
          </div>
        );
      case "Brand":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.color]}
            size="sm"
            variant="flat"
          >
            {user?.brand}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50 ">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit Product">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon
                  onClick={() => router.push(`/EditProduct/${user?._id}`)}
                />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Product">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon
                  // onClick={() => handleDelete(user?._id)}
                  key={"blur"}
                  variant="flat"
                  color="warning"
                  onClick={() => handleDeleteModal(user?._id)}
                  className="capitalize"
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleProductDelete();
                }}
              >
                <ModalHeader className="flex flex-col gap-1">
                  Delete Item
                </ModalHeader>
                <ModalBody>
                  <p>Are you sure you want to delete this item?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    No
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    onPress={onClose}
                  >
                    Yes
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.Product}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={ProductData?.allProduct || []}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
