import type { Order } from "./model/types";

export const mockOrders: Order[] = [
  {
    id: "#1200",
    date: "1-11-2025",
    status: "pending",
    total: 165000,
    items: [
      {
        id: 1,
        name: "Nhãn xuồng cơm vàng",
        qty: 1,
        price: 95000,
        image: "/Xoai-cat-hoa-loc.jpg",
      },
      {
        id: 2,
        name: "Xoài cát hòa lộc",
        qty: 1,
        price: 70000,
        image: "/Cai-bo-xoi.png",
      },
    ],
  },
  {
    id: "#1201",
    date: "1-11-2025",
    status: "shipping",
    total: 165000,
    items: [
      {
        id: 1,
        name: "Nhãn xuồng cơm vàng",
        qty: 1,
        price: 95000,
        image: "/Xoai-cat-hoa-loc.jpg",
      },
      {
        id: 2,
        name: "Xoài cát hòa lộc",
        qty: 1,
        price: 70000,
        image: "/Cai-bo-xoi.png",
      },
    ],
  },
  {
    id: "#1202",
    date: "1-11-2025",
    status: "delivered",
    total: 165000,
    items: [
      {
        id: 1,
        name: "Nhãn xuồng cơm vàng",
        qty: 1,
        price: 95000,
        image: "/Xoai-cat-hoa-loc.jpg",
      },
      {
        id: 2,
        name: "Xoài cát hòa lộc",
        qty: 1,
        price: 70000,
        image: "/Xoai-cat-hoa-loc.jpg",
      },
    ],
  },
  {
    id: "#1203",
    date: "1-11-2025",
    status: "cancelled",
    total: 165000,
    items: [
      {
        id: 1,
        name: "Nhãn xuồng cơm vàng",
        qty: 1,
        price: 95000,
        image: "/Xoai-cat-hoa-loc.jpg",
      },
      {
        id: 2,
        name: "Xoài cát hòa lộc",
        qty: 1,
        price: 70000,
        image: "/Xoai-cat-hoa-loc.jpg",
      },
    ],
  },
];
