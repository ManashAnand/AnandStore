"use client";
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";
import { EditIcon } from "../Icons/EditIcon";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { columns, users } from "@/data";
import { EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const statusColorMap = {
  Black: "success",
  Red: "danger",
  Yellow: "warning",
  Blue:"default",

};

const handleEdit = (id) => {
  console.log("working")
}

export default function ProductTable({ProductData}) {

  const router = useRouter();

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "Product":
        return (
          <div>{user.title}</div>
        );
      case "Category":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.category}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.color]} size="sm" variant="flat">
            {user?.brand}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details" >
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50 " >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user" 
            
            >
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" 
            >
                <EditIcon 
                onClick={() => router.push(`/EditProduct/${user?._id}`)}
                />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
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
  <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.Product}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={ProductData?.allProduct || []}>
         {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            
          </TableRow>
        )} 
      </TableBody>
     
    </Table>
    </>
  );
}
