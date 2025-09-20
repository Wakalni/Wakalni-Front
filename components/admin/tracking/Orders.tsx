import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone, DollarSign, User, Package } from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: string[];
  total: number;
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
  orderTime: string;
  deliveryAddress: string;
  paymentMethod: "cash" | "card" | "wallet";
}

const OrdersList = () => {
  const orders: Order[] = [
    {
      id: "#ORD-001",
      customerName: "جهاد التربانى",
      customerPhone: "+213 555 123 456",
      items: ["Pizza Margherita", "Coca Cola", "Salade César"],
      total: 2850,
      status: "preparing",
      orderTime: "14:30",
      deliveryAddress: "حى النصر، الجزائر العاصمة",
      paymentMethod: "cash",
    },
    {
      id: "#ORD-002",
      customerName: "أمينة بن علي",
      customerPhone: "+213 555 987 654",
      items: ["Burger Royal", "Frites", "Jus d'orange"],
      total: 1950,
      status: "ready",
      orderTime: "14:15",
      deliveryAddress: "شارع ديدوش مراد، وهران",
      paymentMethod: "card",
    },
    {
      id: "#ORD-003",
      customerName: "محمد الشريف",
      customerPhone: "+213 555 456 789",
      items: ["Tacos Poulet", "Harissa", "Thé à la menthe"],
      total: 1650,
      status: "delivered",
      orderTime: "13:45",
      deliveryAddress: "حى بلكور، قسنطينة",
      paymentMethod: "wallet",
    },
    {
      id: "#ORD-004",
      customerName: "فاطمة الزهراء",
      customerPhone: "+213 555 321 987",
      items: ["Couscous Royal", "Chorba", "Makroudh"],
      total: 3200,
      status: "pending",
      orderTime: "14:45",
      deliveryAddress: "المدينة الجديدة، عنابة",
      paymentMethod: "cash",
    },
    {
      id: "#ORD-005",
      customerName: "عبد الرحمن بوعلام",
      customerPhone: "+213 555 654 321",
      items: ["Shawarma", "Houmous", "Pain pita"],
      total: 1450,
      status: "cancelled",
      orderTime: "13:30",
      deliveryAddress: "حى الأمير عبد القادر، سطيف",
      paymentMethod: "card",
    },
    {
      id: "#ORD-006",
      customerName: "خديجة مرابط",
      customerPhone: "+213 555 789 123",
      items: ["Pastitsio", "Salade grecque", "Baklava"],
      total: 2750,
      status: "preparing",
      orderTime: "14:20",
      deliveryAddress: "وسط المدينة، تلمسان",
      paymentMethod: "wallet",
    },
  ];

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "preparing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "ready":
        return "bg-green-100 text-green-800 border-green-200";
      case "delivered":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "En attente";
      case "preparing":
        return "En préparation";
      case "ready":
        return "Prête";
      case "delivered":
        return "Livrée";
      case "cancelled":
        return "Annulée";
      default:
        return status;
    }
  };

  const getPaymentIcon = (method: Order["paymentMethod"]) => {
    switch (method) {
      case "cash":
        return "💵";
      case "card":
        return "💳";
      case "wallet":
        return "👛";
      default:
        return "💰";
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">
          Liste des Commandes
        </h1>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {orders.length} commandes
        </Badge>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  {order.id}
                </CardTitle>
                <Badge className={getStatusColor(order.status)}>
                  {getStatusText(order.status)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-right" dir="rtl">
                      {order.customerName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{order.customerPhone}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-right" dir="rtl">
                      {order.deliveryAddress}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Commandé à {order.orderTime}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground">
                      Articles:
                    </h4>
                    <ul className="text-sm space-y-1">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {getPaymentIcon(order.paymentMethod)}
                      </span>
                      <span className="text-sm text-muted-foreground capitalize">
                        {order.paymentMethod}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 font-bold text-lg">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-green-600">{order.total} DA</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t">
                {order.status === "pending" && (
                  <>
                    <Button size="sm" className="flex-1">
                      Accepter
                    </Button>
                    <Button size="sm" variant="destructive" className="flex-1">
                      Refuser
                    </Button>
                  </>
                )}

                {order.status === "preparing" && (
                  <Button size="sm" className="flex-1">
                    Marquer comme prête
                  </Button>
                )}

                {order.status === "ready" && (
                  <Button size="sm" className="flex-1">
                    Marquer comme livrée
                  </Button>
                )}

                <Button size="sm" variant="outline">
                  Détails
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
