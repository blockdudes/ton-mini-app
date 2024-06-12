struct Array_Order {
    Map: map<Int as uint16, Order>;
    length: Int = 0;
}
const MaxArraySize: Int = 5000;

extends mutates fun append(self: Array_Order, item: Order) {
    require((self.length + 1) <= MaxArraySize, "No space in the array left for new items!");
    self.Map.set(self.length, item);
    self.length += 1;
}

extends fun getIdx(self: Array_Order, idx: Int): Order {
    require(self.length > 0, "No items in the array!");
    require(idx >= 0, "Index of the item cannot be negative!");
    require(idx < self.length, "Index is out of array bounds!");
    return self.Map.get(idx)!!;
}

fun emptyArray_Order(): Array_Order {
    return Array_Order{Map: emptyMap(), length: 0};
}

struct Array_Item {
    Map: map<Int as uint16, Item>;
    length: Int = 0;
}

extends mutates fun append(self: Array_Item, item: Item) {
    require((self.length + 1) <= MaxArraySize, "No space in the array left for new items!");
    self.Map.set(self.length, item);
    self.length += 1;
}

extends fun getIdx(self: Array_Item, idx: Int): Item {
    require(self.length > 0, "No items in the array!");
    require(idx >= 0, "Index of the item cannot be negative!");
    require(idx < self.length, "Index is out of array bounds!");
    return self.Map.get(idx)!!;
}

fun emptyArray_Item(): Array_Item {
    return Array_Item{Map: emptyMap(), length: 0};
}

struct Array_ItemIds {
    Map: map<Int as uint16, Int as uint16>;
    length: Int = 0;
}

extends mutates fun append(self: Array_ItemIds, item: Int) {
    require((self.length + 1) <= MaxArraySize, "No space in the array left for new items!");
    self.Map.set(self.length, item);
    self.length += 1;
}

extends fun getIdx(self: Array_ItemIds, idx: Int): Int { 
    require(self.length > 0, "No items in the array!");
    require(idx >= 0, "Index of the item cannot be negative!");
    require(idx < self.length, "Index is out of array bounds!");
    return self.Map.get(idx)!!;
}

fun emptyArray_ItemIds(): Array_ItemIds {
    return Array_ItemIds{Map: emptyMap(), length: 0};
}

struct Array_MenuItem {
    Map: map<Int as uint16, MenuItem>;
    length: Int = 0;
}

extends mutates fun append(self: Array_MenuItem, item: MenuItem) {
    require((self.length + 1) <= MaxArraySize, "No space in the array left for new items!");
    self.Map.set(self.length, item);
    self.length += 1;
}

extends fun getIdx(self: Array_MenuItem, idx: Int): MenuItem {
    require(self.length > 0, "No items in the array!");
    require(idx >= 0, "Index of the item cannot be negative!");
    require(idx < self.length, "Index is out of array bounds!");
    return self.Map.get(idx)!!;
}

fun emptyArray_MenuItem(): Array_MenuItem {
    return Array_MenuItem{Map: emptyMap(), length: 0};
}

struct Array_OrderItem {
    Map: map<Int as uint16, OrderItem>;
    length: Int = 0;
}

extends mutates fun append(self: Array_OrderItem, item: OrderItem) {
    require((self.length + 1) <= MaxArraySize, "No space in the array left for new items!");
    self.Map.set(self.length, item);
    self.length += 1;
}

extends fun getIdx(self: Array_OrderItem, idx: Int): OrderItem {
    require(self.length > 0, "No items in the array!");
    require(idx >= 0, "Index of the item cannot be negative!");
    require(idx < self.length, "Index is out of array bounds!");
    return self.Map.get(idx)!!;
}

fun emptyArray_OrderItem(): Array_OrderItem {
    return Array_OrderItem{Map: emptyMap(), length: 0};
}

struct Array_Restaurant {
    Map: map<Int as uint16, Restaurant>;
    length: Int = 0;
}

extends mutates fun append(self: Array_Restaurant, item: Restaurant) {
    require((self.length + 1) <= MaxArraySize, "No space in the array left for new items!");
    self.Map.set(self.length, item);
    self.length += 1;
}

extends fun getIdx(self: Array_Restaurant, idx: Int): Restaurant {
    require(self.length > 0, "No items in the array!");
    require(idx >= 0, "Index of the item cannot be negative!");
    require(idx < self.length, "Index is out of array bounds!");
    return self.Map.get(idx)!!;
}

fun emptyArray_Restaurant(): Array_Restaurant {
    return Array_Restaurant{Map: emptyMap(), length: 0};
}

struct Restaurant {
    restaurantId: Address;
    name: String;
    imageUrl: String;
    description: String;
    vendorDetails: User;
    menu: Array_MenuItem;
}
struct Order {
    restaurantId: Address;
    orderId: Int as uint256;
    items: Array_OrderItem;
    userDetails: User;
    billingDetails: BillingDetails;
    status: Int as uint8;
    category: Int as uint8;
    createdAt: Int;
}
struct User {
    walletAddress: Address;
    name: String;
    phoneNumber: String;
    location: String;
}
struct Item {
    name: String;
    description: String;
    price: Int as uint32;
    imageUrl: String;
}
struct MenuItem {
    id: Int as uint256;
    name: String;
    description: String;
    price: Int as uint32;
    imageUrl: String;
    isDeleted: Bool;
}
struct OrderItem {
    id: Int as uint256;
    quantity: Int as uint8;
}
struct BillingDetails {
    totalAmount: Int as uint256;
}