import {
  Home,
  GraduationCap,
  BookOpen,
  Users,
  Building2,
  Tag,
  ShoppingBag,
  Wallet
} from "lucide-react";

export const menuGroups = [
  {
    label: "Tổng quan",
    items: [
      {
        id: "home",
        name: "Trang chủ",
        path: "/home",
        icon: <Home className="h-[18px] w-[18px]" />
      }
    ]
  },
  {
    label: "Học viên",
    items: [
      {
        id: "students",
        name: "Học viên",
        path: "/students",
        icon: <GraduationCap className="h-[18px] w-[18px]" />
      }
    ]
  },
  {
    label: "Đào tạo",
    items: [
      {
        id: "courses",
        name: "Khóa học",
        path: "/courses",
        icon: <BookOpen className="h-[18px] w-[18px]" />
      },
      {
        id: "classes",
        name: "Lớp học",
        path: "/classes",
        icon: <Users className="h-[18px] w-[18px]" />
      }
    ]
  },
  {
    label: "Nguồn lực",
    items: [
      {
        id: "employees",
        name: "Nhân viên",
        path: "/staffs",
        icon: <Users className="h-[18px] w-[18px]" />
      },
      {
        id: "facilities",
        name: "Cơ sở",
        path: "/facilities",
        icon: <Building2 className="h-[18px] w-[18px]" />
      }
    ]
  },
  {
    label: "Giao dịch",
    items: [
      {
        id: "products",
        name: "Sản phẩm",
        path: "/products",
        icon: <Tag className="h-[18px] w-[18px]" />
      },
      {
        id: "orders",
        name: "Đơn hàng",
        path: "/orders",
        icon: <ShoppingBag className="h-[18px] w-[18px]" />
      },
      {
        id: "transactions",
        name: "Giao dịch",
        path: "/transactions",
        icon: <Wallet className="h-[18px] w-[18px]" />
      }
    ]
  }
]; 