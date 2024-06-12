import "./structs.tact";
message CreateRestaurant {
    restaurantName: String;
    restaurantImageUrl: String;
    restaurantDescription: String;
    vendorDetails: User;
    menuItems: Array_Item;
}
message CreateOrder {
    restaurantId: Address;
    items: Array_OrderItem;
    userDetails: User;
    billingDetails: BillingDetails;
    category: Int as uint8;
}
message DeliverOrder {
    restaurantId: Address;
    orderId: Int as uint256;
}
message CancelOrder {
    restaurantId: Address;
    orderId: Int as uint256;
}
message AcceptOrder {
    restaurantId: Address;
    orderId: Int as uint256;
}
message RejectOrder {
    restaurantId: Address;
    orderId: Int as uint256;
}
message AddMenuItems {
    restaurantId: Address;
    items: Array_Item;
}
message DeleteMenuItems {
    restaurantId: Address;
    items: Array_ItemIds;
}
message UpdateRestaurantDetails {
    restaurantId: Address;
    restaurantName: String?;
    restaurantImageUrl: String?;
    restaurantDescription: String?;
    vendorWalletAddress: Address?;
    vendorName: String?;
    vendorImageUrl: String?;
    vendorPhoneNumber: String?;
    vendorLocation: String?;
}