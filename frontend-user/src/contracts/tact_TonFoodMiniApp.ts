import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  TupleReader,
  Dictionary,
  contractAddress,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue,
} from "@ton/core";

export type StateInit = {
  $$type: "StateInit";
  code: Cell;
  data: Cell;
};

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeRef(src.code);
    b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  let sc_0 = slice;
  let _code = sc_0.loadRef();
  let _data = sc_0.loadRef();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

export type Context = {
  $$type: "Context";
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Cell;
};

export function storeContext(src: Context) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounced);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw);
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

export type SendParameters = {
  $$type: "SendParameters";
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
};

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounce);
    b_0.storeAddress(src.to);
    b_0.storeInt(src.value, 257);
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code);
    } else {
      b_0.storeBit(false);
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadSendParameters(slice: Slice) {
  let sc_0 = slice;
  let _bounce = sc_0.loadBit();
  let _to = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _mode = sc_0.loadIntBig(257);
  let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

export type Deploy = {
  $$type: "Deploy";
  queryId: bigint;
};

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "Deploy" as const, queryId: _queryId };
}

export type DeployOk = {
  $$type: "DeployOk";
  queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

export type FactoryDeploy = {
  $$type: "FactoryDeploy";
  queryId: bigint;
  cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1829761339, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

export type Array_Order = {
  $$type: "Array_Order";
  Map: Dictionary<number, Order>;
  length: bigint;
};

export function storeArray_Order(src: Array_Order) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(src.Map, Dictionary.Keys.Uint(16), dictValueParserOrder());
    b_0.storeInt(src.length, 257);
  };
}

export function loadArray_Order(slice: Slice) {
  let sc_0 = slice;
  let _Map = Dictionary.load(
    Dictionary.Keys.Uint(16),
    dictValueParserOrder(),
    sc_0
  );
  let _length = sc_0.loadIntBig(257);
  return { $$type: "Array_Order" as const, Map: _Map, length: _length };
}

function loadTupleArray_Order(source: TupleReader) {
  let _Map = Dictionary.loadDirect(
    Dictionary.Keys.Uint(16),
    dictValueParserOrder(),
    source.readCellOpt()
  );
  let _length = source.readBigNumber();
  return { $$type: "Array_Order" as const, Map: _Map, length: _length };
}

export type Array_Item = {
  $$type: "Array_Item";
  Map: Dictionary<number, Item>;
  length: bigint;
};

export function storeArray_Item(src: Array_Item) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(src.Map, Dictionary.Keys.Uint(16), dictValueParserItem());
    b_0.storeInt(src.length, 257);
  };
}

export function loadArray_Item(slice: Slice) {
  let sc_0 = slice;
  let _Map = Dictionary.load(
    Dictionary.Keys.Uint(16),
    dictValueParserItem(),
    sc_0
  );
  let _length = sc_0.loadIntBig(257);
  return { $$type: "Array_Item" as const, Map: _Map, length: _length };
}

export type Array_ItemIds = {
  $$type: "Array_ItemIds";
  Map: Dictionary<number, number>;
  length: bigint;
};

export function storeArray_ItemIds(src: Array_ItemIds) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(
      src.Map,
      Dictionary.Keys.Uint(16),
      Dictionary.Values.Uint(16)
    );
    b_0.storeInt(src.length, 257);
  };
}

export function loadArray_ItemIds(slice: Slice) {
  let sc_0 = slice;
  let _Map = Dictionary.load(
    Dictionary.Keys.Uint(16),
    Dictionary.Values.Uint(16),
    sc_0
  );
  let _length = sc_0.loadIntBig(257);
  return { $$type: "Array_ItemIds" as const, Map: _Map, length: _length };
}

export type Array_MenuItem = {
  $$type: "Array_MenuItem";
  Map: Dictionary<number, MenuItem>;
  length: bigint;
};

export function storeArray_MenuItem(src: Array_MenuItem) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(src.Map, Dictionary.Keys.Uint(16), dictValueParserMenuItem());
    b_0.storeInt(src.length, 257);
  };
}

export function loadArray_MenuItem(slice: Slice) {
  let sc_0 = slice;
  let _Map = Dictionary.load(
    Dictionary.Keys.Uint(16),
    dictValueParserMenuItem(),
    sc_0
  );
  let _length = sc_0.loadIntBig(257);
  return { $$type: "Array_MenuItem" as const, Map: _Map, length: _length };
}

export type Array_OrderItem = {
  $$type: "Array_OrderItem";
  Map: Dictionary<number, OrderItem>;
  length: bigint;
};

export function storeArray_OrderItem(src: Array_OrderItem) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(
      src.Map,
      Dictionary.Keys.Uint(16),
      dictValueParserOrderItem()
    );
    b_0.storeInt(src.length, 257);
  };
}

export function loadArray_OrderItem(slice: Slice) {
  let sc_0 = slice;
  let _Map = Dictionary.load(
    Dictionary.Keys.Uint(16),
    dictValueParserOrderItem(),
    sc_0
  );
  let _length = sc_0.loadIntBig(257);
  return { $$type: "Array_OrderItem" as const, Map: _Map, length: _length };
}

export type Array_Restaurant = {
  $$type: "Array_Restaurant";
  Map: Dictionary<number, Restaurant>;
  length: bigint;
};

export function storeArray_Restaurant(src: Array_Restaurant) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(
      src.Map,
      Dictionary.Keys.Uint(16),
      dictValueParserRestaurant()
    );
    b_0.storeInt(src.length, 257);
  };
}

export function loadArray_Restaurant(slice: Slice) {
  let sc_0 = slice;
  let _Map = Dictionary.load(
    Dictionary.Keys.Uint(16),
    dictValueParserRestaurant(),
    sc_0
  );
  let _length = sc_0.loadIntBig(257);
  return { $$type: "Array_Restaurant" as const, Map: _Map, length: _length };
}

function loadTupleArray_Restaurant(source: TupleReader) {
  let _Map = Dictionary.loadDirect(
    Dictionary.Keys.Uint(16),
    dictValueParserRestaurant(),
    source.readCellOpt()
  );
  let _length = source.readBigNumber();
  return { $$type: "Array_Restaurant" as const, Map: _Map, length: _length };
}

export type Array_OrderRefs = {
  $$type: "Array_OrderRefs";
  Map: Dictionary<number, OrderRef>;
  length: bigint;
};

export function storeArray_OrderRefs(src: Array_OrderRefs) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(src.Map, Dictionary.Keys.Uint(16), dictValueParserOrderRef());
    b_0.storeInt(src.length, 257);
  };
}

export function loadArray_OrderRefs(slice: Slice) {
  let sc_0 = slice;
  let _Map = Dictionary.load(
    Dictionary.Keys.Uint(16),
    dictValueParserOrderRef(),
    sc_0
  );
  let _length = sc_0.loadIntBig(257);
  return { $$type: "Array_OrderRefs" as const, Map: _Map, length: _length };
}

export type Restaurant = {
  $$type: "Restaurant";
  restaurantId: Address;
  name: string;
  imageUrl: string;
  description: string;
  vendorDetails: User;
  menu: Array_MenuItem;
};

export function storeRestaurant(src: Restaurant) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.restaurantId);
    b_0.storeStringRefTail(src.name);
    b_0.storeStringRefTail(src.imageUrl);
    b_0.storeStringRefTail(src.description);
    let b_1 = new Builder();
    b_1.store(storeUser(src.vendorDetails));
    let b_2 = new Builder();
    b_2.store(storeArray_MenuItem(src.menu));
    b_1.storeRef(b_2.endCell());
    b_0.storeRef(b_1.endCell());
  };
}

export function loadRestaurant(slice: Slice) {
  let sc_0 = slice;
  let _restaurantId = sc_0.loadAddress();
  let _name = sc_0.loadStringRefTail();
  let _imageUrl = sc_0.loadStringRefTail();
  let _description = sc_0.loadStringRefTail();
  let sc_1 = sc_0.loadRef().beginParse();
  let _vendorDetails = loadUser(sc_1);
  let sc_2 = sc_1.loadRef().beginParse();
  let _menu = loadArray_MenuItem(sc_2);
  return {
    $$type: "Restaurant" as const,
    restaurantId: _restaurantId,
    name: _name,
    imageUrl: _imageUrl,
    description: _description,
    vendorDetails: _vendorDetails,
    menu: _menu,
  };
}

function dictValueParserRestaurant(): DictionaryValue<Restaurant> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeRestaurant(src)).endCell());
    },
    parse: (src) => {
      return loadRestaurant(src.loadRef().beginParse());
    },
  };
}

export type Order = {
  $$type: "Order";
  restaurantId: Address;
  orderId: bigint;
  items: Array_OrderItem;
  userDetails: User;
  billingDetails: BillingDetails;
  status: bigint;
  category: bigint;
  createdAt: bigint;
};

export function storeOrder(src: Order) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.restaurantId);
    b_0.storeUint(src.orderId, 256);
    b_0.store(storeArray_OrderItem(src.items));
    let b_1 = new Builder();
    b_1.store(storeUser(src.userDetails));
    b_1.store(storeBillingDetails(src.billingDetails));
    b_1.storeUint(src.status, 8);
    b_1.storeUint(src.category, 8);
    b_1.storeInt(src.createdAt, 257);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadOrder(slice: Slice) {
  let sc_0 = slice;
  let _restaurantId = sc_0.loadAddress();
  let _orderId = sc_0.loadUintBig(256);
  let _items = loadArray_OrderItem(sc_0);
  let sc_1 = sc_0.loadRef().beginParse();
  let _userDetails = loadUser(sc_1);
  let _billingDetails = loadBillingDetails(sc_1);
  let _status = sc_1.loadUintBig(8);
  let _category = sc_1.loadUintBig(8);
  let _createdAt = sc_1.loadIntBig(257);
  return {
    $$type: "Order" as const,
    restaurantId: _restaurantId,
    orderId: _orderId,
    items: _items,
    userDetails: _userDetails,
    billingDetails: _billingDetails,
    status: _status,
    category: _category,
    createdAt: _createdAt,
  };
}

function dictValueParserOrder(): DictionaryValue<Order> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeOrder(src)).endCell());
    },
    parse: (src) => {
      return loadOrder(src.loadRef().beginParse());
    },
  };
}

export type User = {
  $$type: "User";
  walletAddress: Address;
  name: string;
  phoneNumber: string;
  location: string;
};

export function storeUser(src: User) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.walletAddress);
    b_0.storeStringRefTail(src.name);
    b_0.storeStringRefTail(src.phoneNumber);
    b_0.storeStringRefTail(src.location);
  };
}

export function loadUser(slice: Slice) {
  let sc_0 = slice;
  let _walletAddress = sc_0.loadAddress();
  let _name = sc_0.loadStringRefTail();
  let _phoneNumber = sc_0.loadStringRefTail();
  let _location = sc_0.loadStringRefTail();
  return {
    $$type: "User" as const,
    walletAddress: _walletAddress,
    name: _name,
    phoneNumber: _phoneNumber,
    location: _location,
  };
}

export type Item = {
  $$type: "Item";
  name: string;
  description: string;
  price: bigint;
  imageUrl: string;
};

export function storeItem(src: Item) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeStringRefTail(src.name);
    b_0.storeStringRefTail(src.description);
    b_0.storeUint(src.price, 256);
    b_0.storeStringRefTail(src.imageUrl);
  };
}

export function loadItem(slice: Slice) {
  let sc_0 = slice;
  let _name = sc_0.loadStringRefTail();
  let _description = sc_0.loadStringRefTail();
  let _price = sc_0.loadUintBig(256);
  let _imageUrl = sc_0.loadStringRefTail();
  return {
    $$type: "Item" as const,
    name: _name,
    description: _description,
    price: _price,
    imageUrl: _imageUrl,
  };
}

function dictValueParserItem(): DictionaryValue<Item> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeItem(src)).endCell());
    },
    parse: (src) => {
      return loadItem(src.loadRef().beginParse());
    },
  };
}

export type MenuItem = {
  $$type: "MenuItem";
  id: bigint;
  name: string;
  description: string;
  price: bigint;
  imageUrl: string;
  isDeleted: boolean;
};

export function storeMenuItem(src: MenuItem) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(src.id, 256);
    b_0.storeStringRefTail(src.name);
    b_0.storeStringRefTail(src.description);
    b_0.storeUint(src.price, 256);
    b_0.storeStringRefTail(src.imageUrl);
    b_0.storeBit(src.isDeleted);
  };
}

export function loadMenuItem(slice: Slice) {
  let sc_0 = slice;
  let _id = sc_0.loadUintBig(256);
  let _name = sc_0.loadStringRefTail();
  let _description = sc_0.loadStringRefTail();
  let _price = sc_0.loadUintBig(256);
  let _imageUrl = sc_0.loadStringRefTail();
  let _isDeleted = sc_0.loadBit();
  return {
    $$type: "MenuItem" as const,
    id: _id,
    name: _name,
    description: _description,
    price: _price,
    imageUrl: _imageUrl,
    isDeleted: _isDeleted,
  };
}

function dictValueParserMenuItem(): DictionaryValue<MenuItem> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeMenuItem(src)).endCell());
    },
    parse: (src) => {
      return loadMenuItem(src.loadRef().beginParse());
    },
  };
}

export type OrderItem = {
  $$type: "OrderItem";
  id: bigint;
  quantity: bigint;
};

export function storeOrderItem(src: OrderItem) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(src.id, 256);
    b_0.storeUint(src.quantity, 8);
  };
}

export function loadOrderItem(slice: Slice) {
  let sc_0 = slice;
  let _id = sc_0.loadUintBig(256);
  let _quantity = sc_0.loadUintBig(8);
  return { $$type: "OrderItem" as const, id: _id, quantity: _quantity };
}

function dictValueParserOrderItem(): DictionaryValue<OrderItem> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeOrderItem(src)).endCell());
    },
    parse: (src) => {
      return loadOrderItem(src.loadRef().beginParse());
    },
  };
}

export type BillingDetails = {
  $$type: "BillingDetails";
  totalAmount: bigint;
};

export function storeBillingDetails(src: BillingDetails) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(src.totalAmount, 256);
  };
}

export function loadBillingDetails(slice: Slice) {
  let sc_0 = slice;
  let _totalAmount = sc_0.loadUintBig(256);
  return { $$type: "BillingDetails" as const, totalAmount: _totalAmount };
}

export type OrderRef = {
  $$type: "OrderRef";
  restaurantId: Address;
  orderId: bigint;
};

export function storeOrderRef(src: OrderRef) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.restaurantId);
    b_0.storeUint(src.orderId, 256);
  };
}

export function loadOrderRef(slice: Slice) {
  let sc_0 = slice;
  let _restaurantId = sc_0.loadAddress();
  let _orderId = sc_0.loadUintBig(256);
  return {
    $$type: "OrderRef" as const,
    restaurantId: _restaurantId,
    orderId: _orderId,
  };
}

function dictValueParserOrderRef(): DictionaryValue<OrderRef> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeOrderRef(src)).endCell());
    },
    parse: (src) => {
      return loadOrderRef(src.loadRef().beginParse());
    },
  };
}

export type CreateRestaurant = {
  $$type: "CreateRestaurant";
  restaurantName: string;
  restaurantImageUrl: string;
  restaurantDescription: string;
  vendorDetails: User;
  menuItems: Array_Item;
};

export function storeCreateRestaurant(src: CreateRestaurant) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3030386425, 32);
    b_0.storeStringRefTail(src.restaurantName);
    b_0.storeStringRefTail(src.restaurantImageUrl);
    b_0.storeStringRefTail(src.restaurantDescription);
    let b_1 = new Builder();
    b_1.store(storeUser(src.vendorDetails));
    let b_2 = new Builder();
    b_2.store(storeArray_Item(src.menuItems));
    b_1.storeRef(b_2.endCell());
    b_0.storeRef(b_1.endCell());
  };
}

export function loadCreateRestaurant(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3030386425) {
    throw Error("Invalid prefix");
  }
  let _restaurantName = sc_0.loadStringRefTail();
  let _restaurantImageUrl = sc_0.loadStringRefTail();
  let _restaurantDescription = sc_0.loadStringRefTail();
  let sc_1 = sc_0.loadRef().beginParse();
  let _vendorDetails = loadUser(sc_1);
  let sc_2 = sc_1.loadRef().beginParse();
  let _menuItems = loadArray_Item(sc_2);
  return {
    $$type: "CreateRestaurant" as const,
    restaurantName: _restaurantName,
    restaurantImageUrl: _restaurantImageUrl,
    restaurantDescription: _restaurantDescription,
    vendorDetails: _vendorDetails,
    menuItems: _menuItems,
  };
}

export type CreateOrder = {
  $$type: "CreateOrder";
  restaurantId: Address;
  items: Array_OrderItem;
  userDetails: User;
  billingDetails: BillingDetails;
  category: bigint;
};

export function storeCreateOrder(src: CreateOrder) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2149543816, 32);
    b_0.storeAddress(src.restaurantId);
    b_0.store(storeArray_OrderItem(src.items));
    let b_1 = new Builder();
    b_1.store(storeUser(src.userDetails));
    b_1.store(storeBillingDetails(src.billingDetails));
    b_1.storeUint(src.category, 8);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadCreateOrder(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2149543816) {
    throw Error("Invalid prefix");
  }
  let _restaurantId = sc_0.loadAddress();
  let _items = loadArray_OrderItem(sc_0);
  let sc_1 = sc_0.loadRef().beginParse();
  let _userDetails = loadUser(sc_1);
  let _billingDetails = loadBillingDetails(sc_1);
  let _category = sc_1.loadUintBig(8);
  return {
    $$type: "CreateOrder" as const,
    restaurantId: _restaurantId,
    items: _items,
    userDetails: _userDetails,
    billingDetails: _billingDetails,
    category: _category,
  };
}

export type DeliverOrder = {
  $$type: "DeliverOrder";
  restaurantId: Address;
  orderId: bigint;
};

export function storeDeliverOrder(src: DeliverOrder) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(466598426, 32);
    b_0.storeAddress(src.restaurantId);
    b_0.storeUint(src.orderId, 256);
  };
}

export function loadDeliverOrder(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 466598426) {
    throw Error("Invalid prefix");
  }
  let _restaurantId = sc_0.loadAddress();
  let _orderId = sc_0.loadUintBig(256);
  return {
    $$type: "DeliverOrder" as const,
    restaurantId: _restaurantId,
    orderId: _orderId,
  };
}

export type CancelOrder = {
  $$type: "CancelOrder";
  restaurantId: Address;
  orderId: bigint;
};

export function storeCancelOrder(src: CancelOrder) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2977925407, 32);
    b_0.storeAddress(src.restaurantId);
    b_0.storeUint(src.orderId, 256);
  };
}

export function loadCancelOrder(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2977925407) {
    throw Error("Invalid prefix");
  }
  let _restaurantId = sc_0.loadAddress();
  let _orderId = sc_0.loadUintBig(256);
  return {
    $$type: "CancelOrder" as const,
    restaurantId: _restaurantId,
    orderId: _orderId,
  };
}

export type AcceptOrder = {
  $$type: "AcceptOrder";
  restaurantId: Address;
  orderId: bigint;
};

export function storeAcceptOrder(src: AcceptOrder) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3095951649, 32);
    b_0.storeAddress(src.restaurantId);
    b_0.storeUint(src.orderId, 256);
  };
}

export function loadAcceptOrder(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3095951649) {
    throw Error("Invalid prefix");
  }
  let _restaurantId = sc_0.loadAddress();
  let _orderId = sc_0.loadUintBig(256);
  return {
    $$type: "AcceptOrder" as const,
    restaurantId: _restaurantId,
    orderId: _orderId,
  };
}

export type RejectOrder = {
  $$type: "RejectOrder";
  restaurantId: Address;
  orderId: bigint;
};

export function storeRejectOrder(src: RejectOrder) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2504964398, 32);
    b_0.storeAddress(src.restaurantId);
    b_0.storeUint(src.orderId, 256);
  };
}

export function loadRejectOrder(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2504964398) {
    throw Error("Invalid prefix");
  }
  let _restaurantId = sc_0.loadAddress();
  let _orderId = sc_0.loadUintBig(256);
  return {
    $$type: "RejectOrder" as const,
    restaurantId: _restaurantId,
    orderId: _orderId,
  };
}

export type AddMenuItems = {
  $$type: "AddMenuItems";
  restaurantId: Address;
  items: Array_Item;
};

export function storeAddMenuItems(src: AddMenuItems) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2032559395, 32);
    b_0.storeAddress(src.restaurantId);
    b_0.store(storeArray_Item(src.items));
  };
}

export function loadAddMenuItems(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2032559395) {
    throw Error("Invalid prefix");
  }
  let _restaurantId = sc_0.loadAddress();
  let _items = loadArray_Item(sc_0);
  return {
    $$type: "AddMenuItems" as const,
    restaurantId: _restaurantId,
    items: _items,
  };
}

export type DeleteMenuItems = {
  $$type: "DeleteMenuItems";
  restaurantId: Address;
  items: Array_ItemIds;
};

export function storeDeleteMenuItems(src: DeleteMenuItems) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(542497896, 32);
    b_0.storeAddress(src.restaurantId);
    b_0.store(storeArray_ItemIds(src.items));
  };
}

export function loadDeleteMenuItems(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 542497896) {
    throw Error("Invalid prefix");
  }
  let _restaurantId = sc_0.loadAddress();
  let _items = loadArray_ItemIds(sc_0);
  return {
    $$type: "DeleteMenuItems" as const,
    restaurantId: _restaurantId,
    items: _items,
  };
}

export type UpdateRestaurantDetails = {
  $$type: "UpdateRestaurantDetails";
  restaurantId: Address;
  restaurantName: string | null;
  restaurantImageUrl: string | null;
  restaurantDescription: string | null;
  vendorWalletAddress: Address | null;
  vendorName: string | null;
  vendorImageUrl: string | null;
  vendorPhoneNumber: string | null;
  vendorLocation: string | null;
};

export function storeUpdateRestaurantDetails(src: UpdateRestaurantDetails) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(4168228382, 32);
    b_0.storeAddress(src.restaurantId);
    if (src.restaurantName !== null && src.restaurantName !== undefined) {
      b_0.storeBit(true).storeStringRefTail(src.restaurantName);
    } else {
      b_0.storeBit(false);
    }
    if (
      src.restaurantImageUrl !== null &&
      src.restaurantImageUrl !== undefined
    ) {
      b_0.storeBit(true).storeStringRefTail(src.restaurantImageUrl);
    } else {
      b_0.storeBit(false);
    }
    if (
      src.restaurantDescription !== null &&
      src.restaurantDescription !== undefined
    ) {
      b_0.storeBit(true).storeStringRefTail(src.restaurantDescription);
    } else {
      b_0.storeBit(false);
    }
    b_0.storeAddress(src.vendorWalletAddress);
    let b_1 = new Builder();
    if (src.vendorName !== null && src.vendorName !== undefined) {
      b_1.storeBit(true).storeStringRefTail(src.vendorName);
    } else {
      b_1.storeBit(false);
    }
    if (src.vendorImageUrl !== null && src.vendorImageUrl !== undefined) {
      b_1.storeBit(true).storeStringRefTail(src.vendorImageUrl);
    } else {
      b_1.storeBit(false);
    }
    if (src.vendorPhoneNumber !== null && src.vendorPhoneNumber !== undefined) {
      b_1.storeBit(true).storeStringRefTail(src.vendorPhoneNumber);
    } else {
      b_1.storeBit(false);
    }
    let b_2 = new Builder();
    if (src.vendorLocation !== null && src.vendorLocation !== undefined) {
      b_2.storeBit(true).storeStringRefTail(src.vendorLocation);
    } else {
      b_2.storeBit(false);
    }
    b_1.storeRef(b_2.endCell());
    b_0.storeRef(b_1.endCell());
  };
}

export function loadUpdateRestaurantDetails(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4168228382) {
    throw Error("Invalid prefix");
  }
  let _restaurantId = sc_0.loadAddress();
  let _restaurantName = sc_0.loadBit() ? sc_0.loadStringRefTail() : null;
  let _restaurantImageUrl = sc_0.loadBit() ? sc_0.loadStringRefTail() : null;
  let _restaurantDescription = sc_0.loadBit() ? sc_0.loadStringRefTail() : null;
  let _vendorWalletAddress = sc_0.loadMaybeAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _vendorName = sc_1.loadBit() ? sc_1.loadStringRefTail() : null;
  let _vendorImageUrl = sc_1.loadBit() ? sc_1.loadStringRefTail() : null;
  let _vendorPhoneNumber = sc_1.loadBit() ? sc_1.loadStringRefTail() : null;
  let sc_2 = sc_1.loadRef().beginParse();
  let _vendorLocation = sc_2.loadBit() ? sc_2.loadStringRefTail() : null;
  return {
    $$type: "UpdateRestaurantDetails" as const,
    restaurantId: _restaurantId,
    restaurantName: _restaurantName,
    restaurantImageUrl: _restaurantImageUrl,
    restaurantDescription: _restaurantDescription,
    vendorWalletAddress: _vendorWalletAddress,
    vendorName: _vendorName,
    vendorImageUrl: _vendorImageUrl,
    vendorPhoneNumber: _vendorPhoneNumber,
    vendorLocation: _vendorLocation,
  };
}

type TonFoodMiniApp_init_args = {
  $$type: "TonFoodMiniApp_init_args";
};

function initTonFoodMiniApp_init_args(_src: TonFoodMiniApp_init_args) {
  return () => {};
}

async function TonFoodMiniApp_init() {
  const __code = Cell.fromBase64(
    "te6ccgECeQEAGloAART/APSkE/S88sgLAQIBYgIDArDQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVEts88uCCyPhDAcx/AcoAVSBQI/QA9AAByPQAyQHMye1UbwQCASAJCgRwAZIwf+BwIddJwh+VMCDXCx/eIIIQtKAG+brjAiCCEIAfb4i64wIgghC4iHkhuuMCIIIQG8+6GroFBgcIAdIw0x8BghC0oAb5uvLggdQB0AHUAdAB1AHQAdQB0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1AHQAdQB0AHUAdAUQzAE1DDQ9ASBAQHXAFkyEGkQaBBnEEUQNEMAbBnbPH8LAf4w0x8BghCAH2+IuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9ASBAQHXAFkC1AHQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAB1AHQAdQB0BRDMATT/wEB0wcwEGkQaBBFEDQQI2wZ2zx/EAOqMNMfAYIQuIh5Ibry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdP/WWwScds8+EJw2zyIyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAfxtDJATAj9Uw0x8BghAbz7oauvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0/9ZbBJy2zz4QnDbPIjIgljAAAAAAAAAAAAAAAABActnzMlw+wB/4CCCELF/iR+6G0MYGQIBIEpLAgEgYGEB8DCCAJuMcCDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiCbHBbPy9IIAwkH4QibHBfL0gSLRiwglAfkBAfkBvfL0gStniwgkAfkBAfkBvfL0ggCBF4sIIwH5AQH5Ab3y9IFK2IsIKQwE7AH5AQH5Ab3y9IElEIsIKAH5AQH5Ab3y9IEcR4sIJwH5AQH5Ab3y9IIA3eiBAQv4Qi1ZWfQLb6GSMG3fIG6SMG2Oh9DbPGwabwribvL02zwigBD0h2+lIJESlTFtMm0B4pCK6Fsy+EIJCAcGBQRDE4EBC/hCVZFzdCwNBH7IVZDbPMkQNSBulTBZ9FkwlEEz9BPigQEL+ELbPMhZAvQAgQEBzwDJEDQgbpUwWfRZMJRBM/QT4vhCQTBw2zxedEMOATKIyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADwAsAAAAAFJlc3RhdXJhbnQgY3JlYXRlZAL2ggCx/SfCAPL0ggC08XAgyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgnxwWz8vSCAMJB+EInxwXy9IFlaosIJgH5AQH5Ab3y9IIAxLCLCCUB+QEB+QG98vSBR/ohwAKRcOMN8vSBVVYiERIAFIsIJAH5AQH5Ab0B4sMA8vSCAMoq+EFvJBNfAyO+8vSCAPGPIcEDkyHC/5Fw4vL0KoEBCypZ9AtvoZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu8tCAbyIxB3D4IytRkBCcEEgHEGwEBRA8TAwQqy+BAQsvWfQLb6GSMG3fEwP6IG6SMG2d0PQEgQEB1wBZbBJvAuJujqWBAQvbPMhZAvQAgQEBzwDJAhERAlLwIG6VMFn0WTCUQTP0E+IP3i+BAQsvWfQLb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbvLQgG8iLBC+ChCcEI4HEGwQXgQQPE4MEN7bPAF0dxQC8IEBCwLIWQL0AIEBAc8AySQQNwEgbpUwWfRZMJRBM/QT4iOBAQsjWfQLb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuJujqOBAQvbPMhZAvQAgQEBzwDJIxA2ASBulTBZ9FkwlEEz9BPiA94jgQELI1n0C2+hkjBt33QVA8AgbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu8tCAbyJQRhA0ECbbPAGBAQsCyFkC9ACBAQHPAMkSIG6VMFn0WTCUQTP0E+L4QnDbPIjIgljAAAAAAAAAAAAAAAABActnzMlw+wAWQxcAkoIApeUjpIIAw1C78vQBgBACyFlZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wy//JIhA0ASBulTBZ9FswlEEz9BfiAaQAIgAAAABPcmRlciBjcmVhdGVkACYAAAAAT3JkZXIgZGVsaXZlcmVkBMCP1TDTHwGCELF/iR+68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHT/1lsEnPbPPhCcNs8iMiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AH/gIIIQlU65LrobQycaBMCP1TDTHwGCEJVOuS668uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHT/1lsEnTbPPhCcNs8iMiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AH/gIIIQeSZlI7obQyUcA/aCAJ0wJoEBCyVZ9AtvoZIwbd8gbpIwbY6H0Ns8bBpvCuJus/L0gVBtJYEBCyVZ9AtvoZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4m6zkXDjDfL0JIEBCyRZ9AtvoZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu8tCAbyJzHR4Eto69MNMfAYIQeSZlI7ry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfQEgQEB1wBZECNsE9s8f+AgghAgVdxouuMCIIIQ+HIeHrrjAoIQlGqYtrooKSorAY4lgQELJVn0C2+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG7y0IBvIjCAECRZ9A9voZIwbd8gbpIwbY6H0Ns8bBxvDOJus3YD7jCAECNZ9A9voZIwbd8gbpIwbY6H0Ns8bBxvDOIgbvLQgG8sgUroI8MC8vSBLLYjwwPy9IF1LyPDBPL0ggDCQfhCVhABxwWTLcMDkXDikX+d+EJSkMcFky3AA5Fw4uLy9CzAA5qCANm4A8AAE/L04w5Tv4EBC1YQdh8gAEQswASaggDf8gPAABPy9I4RLMACmoIA2W0DwAET8vSRMuLiBPhZ9AtvoZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu8tCAbyIQjRB8EGsQWoAQKgYQXywQXxBOTxMREAHIVbDbPMlEcCBulTBZ9FswlEEz9BfigQELA8hZAvQAgQEBzwDJR3BSUCBulTBZ9FkwlEEz9BPiIcAB4w/4QlADeCEiIwNubCGBAQtURRNZ9AtvoZIwbd8gbpIwbY6H0Ns8bBpvCuIgbvLQgG8qW2xEXwNyiCVZf1UwbW3bPHMkSAM0MyDAA48SwASPC3KIJVl/VTBtbds8kTDi4w0lSCYBBNs8QwAkAAAAAE9yZGVyIGFjY2VwdGVkACQAAAAAT3JkZXIgcmVqZWN0ZWQCGDByiCVZf1UwbW3bPCdIACYAAAAAT3JkZXIgY2FuY2VsbGVkBPaCALH9AcIA8vSCAJ0wJYEBCyRZ9AtvoZIwbd8gbpIwbY6H0Ns8bBpvCuJus/L0ggDCQfhCUjDHBfL0JIEBCyNZ9AtvoZIwbd8gbpIwbY6H0Ns8bBpvCuIgbvLQgG8qbIIigBD0h2+lIJESlTFtMm0B4pCK6FsyJYEBCyRzcywtAXow0x8BghAgVdxouvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9ASBAQHXAFkQI2wT2zx/MQIQMNs8bBnbPH87PAFYjqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHBHAY4gbpIwbY4V0NQB0AHUAdAB0//UAdAUQzBsFG8E4iBu8tCAbyQlVTBwEHgQaNs8gBBURBRZ9HxvpSCUAtQwWJUxbTJtAeIQNC4Ehln0C2+hkjBt3yBukjBtjofQ2zxsGm8K4iBu8tCAbypbVQeBAQsKyFWQ2zzJEDUSIG6VMFn0WTCUQTP0E+L4QhNw2zxzXkMvAViCAKXlJ6SCAMNQu/L0VUCAEAbIVVDbPMkiEDQBIG6VMFn0WzCUQTP0F+IBpDgBMojIgljAAAAAAAAAAAAAAAABActnzMlw+wAwACgAAAAATWVudSBpdGVtcyBhZGRlZAT2ggCx/QHCAPL0ggCdMCWBAQskWfQLb6GSMG3fIG6SMG2Oh9DbPGwabwribrPy9IIAwkH4QlIwxwXy9CSBAQsjWfQLb6GSMG3fIG6SMG2Oh9DbPGwabwriIG7y0IBvKmyCgBBUUwBZ9IZvpSCWUCPXATBYlmwhbTJtAeKKc3MyMwAABJSK6FsyJYEBCyRZ9AtvoZIwbd8gbpIwbY6H0Ns8bBpvCuIgbvLQgG8qW1UHgQELCshVkNs8yRA1EiBulTBZ9FkwlEEz9BPi+EITcDRzXjUBXhBYEEcQNlBi2zyAEFMHA1CIQTP0fG+lIJZQI9cBMFiWbCFtMm0B4hBpEFgQRxA0NgI22zyIyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAQzoCdu2i7ftwk1MBuY8sVHIQ2zwwU0i6jp1/gBA6yFVQ2zzJECQgbpUwWfRbMJRBM/QX4gHbMeBfBaToMGwSNzgBdoEbIyLCAPL0gUuFIcL/8vQggV3GA7kS8vSAEAFZ9A9voZIwbd8gbpIwbY6H0Ns8bBZvBuIgbvLQgG8mOQA+UFbL/8hQBM8WyVADzMhYzxbJAczL/8hYzxbJAczKAAAo0//UAdAB1AHQAdP/1AHQAdIAVVAALAAAAABNZW51IGl0ZW1zIGRlbGV0ZWQB9tMfAYIQ+HIeHrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIAAZPUAdCRbeIB0gABk9QB0JFt4gHSAAGT1AHQkW3iASDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4j0E9DKCAJ0wK4EBCypZ9AtvoZIwbd8gbpIwbY6H0Ns8bBpvCuJus/L0ggDCQfhCUpDHBfL0KoEBCylZ9AtvoZIwbd8gbpIwbY6H0Ns8bBpvCuIgbvLQgG8qVhBus44TiwhWEQEhbpJbf5cB+QEB+QG94pFw4pJXEOMNLm6zc3M+PwB6AdQB0NIAAZPUAdCRbeIB0gABk9QB0JFt4gHSAAGT1AHQkW3iAdQw0NIAAZPUMNCSMG3iEEkQSBBHEEYQRQASOA8gbvLQgAcPA/6OEosIUvAhbpJbf5cB+QEB+QG94pFw4pk2DSBu8tCABQ2RPuIsbrOOEosIUtAhbpJbf5cB+QEB+QG94pFw4pk0CyBu8tCAAwuRPOIqbrORcOMNmTIJIG7y0IBQCZE64ihus44SiwhSkCFuklt/lwH5AQH5Ab3ikXDikTjjDSVuQEFCAHRwIMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIUrAhbpJbcJLHBeKzABAwByBu8tCABwTqs44SiwhSYCFuklt/lwH5AQH5Ab3ikXDimTgEIG7y0IAHBJE14iVus44SiwhSYCFuklt/lwH5AQH5Ab3ikXDimTgEIG7y0IAHBJE14kh2EEUQNAKBAQsKyFWQ2zzJEDUSIG6VMFn0WTCUQTP0E+L4QhNw2zyIXkNERQIw+EFvJBNfAwGhggkxLQChcoh/VTBtbds8RkgAPAAAAABSZXN0YXVyYW50IGRldGFpbHMgdXBkYXRlZAAwyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAABwAAAAAR2FzIHJlZnVuZAE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zxIAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AEkAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCASBMTQIBIFlaAgEgTk8CAVhTVAJNsN9INdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8VQLbPGwygb1ACTbIJiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPFUC2zxsMYG9SBJ4jggCdMCGBAQskWfQLb6GSMG3fIG6SMG2Oh9DbPGwabwribrPy9Ns8EoEBC1AEWfQLb6GSMG3fIG6SMG2Oh9DbPGwabwriIG7y0IBvKhCrc3RzUQEE2zxdAUBSMIEBCwFZ9AtvoZIwbd8gbpIwbY6H0Ns8bBpvCuJus3MCTa+zkGukwICF3XlwRBBrhYUQQIJ/3XloRMGE3XlwRG2eKoFtnjYZQG9VAk2uU5BrpMCAhd15cEQQa4WFEECCf915aETBhN15cERtniqBbZ42GUBvVgEiVHMhEDZFRnTbPGwiMhA0QwByAtiBFJ8igQELI1n0C2+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLibrPy9IEBCyICWfQLb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbvLQgG8iMNs8IoAQ9IdvpSCREpUxbTJtAeKQiuhbbBJ0VwL6IG6SMG2OKND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdP/WWwSbwLiIG7y0IBvIoEBC1RIE1n0C2+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG7y0IBvIjCAEFhZ9A9voZIwbd8gbpIwbY6H0Ns8bBxvDOJ2WAFMIG7y0IBvLBDeEM7bPIAQVEQUWfR8b6UglALUMFiVMW0ybQHiEDR3Ak23YyQa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEbZ4qgW2eNhlBvWwIRtDDbZ5tnjYZQb1wBnIIAnTAkgQELI1n0C2+hkjBt3yBukjBtjofQ2zxsGm8K4m6z8vSBAQsjAln0C2+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG7y0IBvInMDpCLbPCKBAQv0g2+lIJESlTFtMm0B4pCPNiBukjBtjofQ2zxsGm8K4iBu8tCAbyoQvBCs2zyBAQtURBRZ9HRvpSCUAtQwWJUxbTJtAeIQNOhbbBJ0c10BWIIApeUrpIIAw1C78vRVgIAQCshVkNs8ySIQNAEgbpUwWfRbMJRBM/QX4gGkXgHwUKkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIUAjPFslQB8zIUAbPFslQBczIUATPFslQA8zIQ0QFUEMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIWM8WyQHMyFADzxbJWMzIWM8WyQHMyEBDXwAcAvQAgQEBzwDJWMzJAcwAubu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcBvUne+VRZbxx1PT3gVZwyaCcJ2XTlqzTstzOg6WbZRm6KSAIBIGJjAgEgZGUCTbRN5BrpMCAhd15cEQQa4WFEECCf915aETBhN15cERtniqBbZ42GUG9wAgEgZmcCAnRsbQIBIGhpAk2vbhBrpMCAhd15cEQQa4WFEECCf915aETBhN15cERtniqBbZ42GUBvawAQqr7tRNDSAAECTKogINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8VQLbPGwyb2oBIlRzIRA2RUZw2zxsIjIQNEMAcgEiVHMhEDZFRnHbPGwiMhA0QwByAkuiZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8VQLbPGwym9uAHOi7jQ1aXBmczovL1FtWUFadUtUQlJicGp6RHBEeU1CTXNEU29ONVNKMmZocTZHVTQxdkZDdWloOXmCASJUcyEQNkVGc9s8bCIyEDRDAHIBUO1E0NQB+GPSAAGe9AT0BNQB0PQEMEMwbBPgMPgo1wsKgwm68uCJ2zxxASJUcyEQNkVGcts8bCIyEDRDAHIABm1tbQPSggCdMCWBAQskWfQLb6GSMG3fIG6SMG2Oh9DbPGwabwribrPy9IEBC1REE1n0C2+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG7y0IBvIjDbPCKAEPSHb6UgkRKVMW0ybQHikIroW2wic3R1APD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0AHUAdAB1AHQAdQB0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1AHQAdQB0AHUAdAUQzAE1DDQ9ASBAQHXAFkyEGoQaRBoEGcQRRA0QwAABG1wAnogbpIwbY6H0Ns8bBxvDOIgbvLQgG8sIlYRuo6HEN4Qzts8WJJfDOKAECQCWfR8b6UglALUMFiVMW0ybQHidncA7vpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0//0BIEBAdcAWQLUAdD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0AHUAdAB1AHQFEMwBNP/AQHTB9MHgQEB1wAwEIwQixCKEGcQVhBFAViCAKXlLaSCAMNQu/L0VaCAEAzIVbDbPMkiEDQBIG6VMFn0WzCUQTP0F+IBpHgA8lDLINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WGcv/QHYC9ACBAQHPAMhVMAVQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshYzxbJAczIUAPPFslYzMhYzxbJAcxYAcv/EssHE8sHgQEBzwDJAcw="
  );
  const __system = Cell.fromBase64(
    "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"
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initTonFoodMiniApp_init_args({ $$type: "TonFoodMiniApp_init_args" })();
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const TonFoodMiniApp_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack underflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  13: { message: `Out of gas error` },
  32: { message: `Method ID not found` },
  34: { message: `Action is invalid or not supported` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid address` },
  137: { message: `Masterchain support is not enabled for this contract` },
  5279: { message: `User does not have any orders` },
  6947: { message: `No items in the array!` },
  7239: { message: `Restaurant description cannot be empty` },
  8913: { message: `Vendor name cannot be empty` },
  9488: { message: `Restaurant image url cannot be empty` },
  11111: { message: `Vendor phone number cannot be empty` },
  11446: { message: `Order has already been cancelled` },
  18426: { message: `User location cannot be empty` },
  19160: { message: `Restaurant name cannot be empty` },
  19176: { message: `Order has already been delivered` },
  19333: { message: `Index of the item cannot be negative!` },
  20589: { message: `Order does not exist` },
  21846: { message: `Total amount cannot be 0` },
  24006: { message: `Index is out of array bounds!` },
  25962: { message: `User name cannot be empty` },
  29999: { message: `Order has already been rejected` },
  33047: { message: `Vendor location cannot be empty` },
  39820: { message: `Invalid vendor address` },
  40240: { message: `Restaurant does not exist` },
  42469: { message: `No space in the array left for new items!` },
  45565: { message: `Items cannot be empty` },
  46321: { message: `Invalid user address` },
  49729: { message: `Unauthorized` },
  50352: { message: `User phone number cannot be empty` },
  51754: { message: `Insufficient funds` },
  55661: { message: `Order cannot be delivered without being accepted` },
  55736: { message: `Order cannot be cancelled` },
  56808: { message: `Restaurant already exists` },
  57330: { message: `Order cannot be rejected` },
  61839: { message: `Invalid category` },
};

const TonFoodMiniApp_types: ABIType[] = [
  {
    name: "StateInit",
    header: null,
    fields: [
      { name: "code", type: { kind: "simple", type: "cell", optional: false } },
      { name: "data", type: { kind: "simple", type: "cell", optional: false } },
    ],
  },
  {
    name: "Context",
    header: null,
    fields: [
      {
        name: "bounced",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "sender",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "raw", type: { kind: "simple", type: "slice", optional: false } },
    ],
  },
  {
    name: "SendParameters",
    header: null,
    fields: [
      {
        name: "bounce",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "mode",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "body", type: { kind: "simple", type: "cell", optional: true } },
      { name: "code", type: { kind: "simple", type: "cell", optional: true } },
      { name: "data", type: { kind: "simple", type: "cell", optional: true } },
    ],
  },
  {
    name: "Deploy",
    header: 2490013878,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "DeployOk",
    header: 2952335191,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "FactoryDeploy",
    header: 1829761339,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "cashback",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "Array_Order",
    header: null,
    fields: [
      {
        name: "Map",
        type: {
          kind: "dict",
          key: "uint",
          keyFormat: 16,
          value: "Order",
          valueFormat: "ref",
        },
      },
      {
        name: "length",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "Array_Item",
    header: null,
    fields: [
      {
        name: "Map",
        type: {
          kind: "dict",
          key: "uint",
          keyFormat: 16,
          value: "Item",
          valueFormat: "ref",
        },
      },
      {
        name: "length",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "Array_ItemIds",
    header: null,
    fields: [
      {
        name: "Map",
        type: {
          kind: "dict",
          key: "uint",
          keyFormat: 16,
          value: "uint",
          valueFormat: 16,
        },
      },
      {
        name: "length",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "Array_MenuItem",
    header: null,
    fields: [
      {
        name: "Map",
        type: {
          kind: "dict",
          key: "uint",
          keyFormat: 16,
          value: "MenuItem",
          valueFormat: "ref",
        },
      },
      {
        name: "length",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "Array_OrderItem",
    header: null,
    fields: [
      {
        name: "Map",
        type: {
          kind: "dict",
          key: "uint",
          keyFormat: 16,
          value: "OrderItem",
          valueFormat: "ref",
        },
      },
      {
        name: "length",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "Array_Restaurant",
    header: null,
    fields: [
      {
        name: "Map",
        type: {
          kind: "dict",
          key: "uint",
          keyFormat: 16,
          value: "Restaurant",
          valueFormat: "ref",
        },
      },
      {
        name: "length",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "Array_OrderRefs",
    header: null,
    fields: [
      {
        name: "Map",
        type: {
          kind: "dict",
          key: "uint",
          keyFormat: 16,
          value: "OrderRef",
          valueFormat: "ref",
        },
      },
      {
        name: "length",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "Restaurant",
    header: null,
    fields: [
      {
        name: "restaurantId",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "name",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "imageUrl",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "description",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "vendorDetails",
        type: { kind: "simple", type: "User", optional: false },
      },
      {
        name: "menu",
        type: { kind: "simple", type: "Array_MenuItem", optional: false },
      },
    ],
  },
  {
    name: "Order",
    header: null,
    fields: [
      {
        name: "restaurantId",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "orderId",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "items",
        type: { kind: "simple", type: "Array_OrderItem", optional: false },
      },
      {
        name: "userDetails",
        type: { kind: "simple", type: "User", optional: false },
      },
      {
        name: "billingDetails",
        type: { kind: "simple", type: "BillingDetails", optional: false },
      },
      {
        name: "status",
        type: { kind: "simple", type: "uint", optional: false, format: 8 },
      },
      {
        name: "category",
        type: { kind: "simple", type: "uint", optional: false, format: 8 },
      },
      {
        name: "createdAt",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "User",
    header: null,
    fields: [
      {
        name: "walletAddress",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "name",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "phoneNumber",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "location",
        type: { kind: "simple", type: "string", optional: false },
      },
    ],
  },
  {
    name: "Item",
    header: null,
    fields: [
      {
        name: "name",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "description",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "price",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "imageUrl",
        type: { kind: "simple", type: "string", optional: false },
      },
    ],
  },
  {
    name: "MenuItem",
    header: null,
    fields: [
      {
        name: "id",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "name",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "description",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "price",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "imageUrl",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "isDeleted",
        type: { kind: "simple", type: "bool", optional: false },
      },
    ],
  },
  {
    name: "OrderItem",
    header: null,
    fields: [
      {
        name: "id",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "quantity",
        type: { kind: "simple", type: "uint", optional: false, format: 8 },
      },
    ],
  },
  {
    name: "BillingDetails",
    header: null,
    fields: [
      {
        name: "totalAmount",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "OrderRef",
    header: null,
    fields: [
      {
        name: "restaurantId",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "orderId",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "CreateRestaurant",
    header: 3030386425,
    fields: [
      {
        name: "restaurantName",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "restaurantImageUrl",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "restaurantDescription",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "vendorDetails",
        type: { kind: "simple", type: "User", optional: false },
      },
      {
        name: "menuItems",
        type: { kind: "simple", type: "Array_Item", optional: false },
      },
    ],
  },
  {
    name: "CreateOrder",
    header: 2149543816,
    fields: [
      {
        name: "restaurantId",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "items",
        type: { kind: "simple", type: "Array_OrderItem", optional: false },
      },
      {
        name: "userDetails",
        type: { kind: "simple", type: "User", optional: false },
      },
      {
        name: "billingDetails",
        type: { kind: "simple", type: "BillingDetails", optional: false },
      },
      {
        name: "category",
        type: { kind: "simple", type: "uint", optional: false, format: 8 },
      },
    ],
  },
  {
    name: "DeliverOrder",
    header: 466598426,
    fields: [
      {
        name: "restaurantId",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "orderId",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "CancelOrder",
    header: 2977925407,
    fields: [
      {
        name: "restaurantId",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "orderId",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "AcceptOrder",
    header: 3095951649,
    fields: [
      {
        name: "restaurantId",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "orderId",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "RejectOrder",
    header: 2504964398,
    fields: [
      {
        name: "restaurantId",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "orderId",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "AddMenuItems",
    header: 2032559395,
    fields: [
      {
        name: "restaurantId",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "items",
        type: { kind: "simple", type: "Array_Item", optional: false },
      },
    ],
  },
  {
    name: "DeleteMenuItems",
    header: 542497896,
    fields: [
      {
        name: "restaurantId",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "items",
        type: { kind: "simple", type: "Array_ItemIds", optional: false },
      },
    ],
  },
  {
    name: "UpdateRestaurantDetails",
    header: 4168228382,
    fields: [
      {
        name: "restaurantId",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "restaurantName",
        type: { kind: "simple", type: "string", optional: true },
      },
      {
        name: "restaurantImageUrl",
        type: { kind: "simple", type: "string", optional: true },
      },
      {
        name: "restaurantDescription",
        type: { kind: "simple", type: "string", optional: true },
      },
      {
        name: "vendorWalletAddress",
        type: { kind: "simple", type: "address", optional: true },
      },
      {
        name: "vendorName",
        type: { kind: "simple", type: "string", optional: true },
      },
      {
        name: "vendorImageUrl",
        type: { kind: "simple", type: "string", optional: true },
      },
      {
        name: "vendorPhoneNumber",
        type: { kind: "simple", type: "string", optional: true },
      },
      {
        name: "vendorLocation",
        type: { kind: "simple", type: "string", optional: true },
      },
    ],
  },
];

const TonFoodMiniApp_getters: ABIGetter[] = [
  {
    name: "inQueueOrders",
    arguments: [
      {
        name: "restaurantId",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
    returnType: { kind: "simple", type: "Array_Order", optional: false },
  },
  {
    name: "acceptedOrders",
    arguments: [
      {
        name: "restaurantId",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
    returnType: { kind: "simple", type: "Array_Order", optional: false },
  },
  {
    name: "deliveredOrders",
    arguments: [
      {
        name: "restaurantId",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
    returnType: { kind: "simple", type: "Array_Order", optional: false },
  },
  {
    name: "cancelledOrders",
    arguments: [
      {
        name: "restaurantId",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
    returnType: { kind: "simple", type: "Array_Order", optional: false },
  },
  {
    name: "rejectedOrders",
    arguments: [
      {
        name: "restaurantId",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
    returnType: { kind: "simple", type: "Array_Order", optional: false },
  },
  {
    name: "allOrders",
    arguments: [
      {
        name: "restaurantId",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
    returnType: { kind: "simple", type: "Array_Order", optional: false },
  },
  {
    name: "allUserOrders",
    arguments: [
      {
        name: "userId",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
    returnType: { kind: "simple", type: "Array_Order", optional: false },
  },
  {
    name: "allRestaurants",
    arguments: [],
    returnType: { kind: "simple", type: "Array_Restaurant", optional: false },
  },
  {
    name: "restaurantById",
    arguments: [
      {
        name: "restaurantId",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
    returnType: { kind: "simple", type: "Array_Restaurant", optional: false },
  },
  {
    name: "isVendorPresent",
    arguments: [
      {
        name: "restaurantId",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
    returnType: { kind: "simple", type: "bool", optional: false },
  },
];

const TonFoodMiniApp_receivers: ABIReceiver[] = [
  {
    receiver: "internal",
    message: { kind: "typed", type: "CreateRestaurant" },
  },
  { receiver: "internal", message: { kind: "typed", type: "CreateOrder" } },
  { receiver: "internal", message: { kind: "typed", type: "AcceptOrder" } },
  { receiver: "internal", message: { kind: "typed", type: "DeliverOrder" } },
  { receiver: "internal", message: { kind: "typed", type: "CancelOrder" } },
  { receiver: "internal", message: { kind: "typed", type: "RejectOrder" } },
  { receiver: "internal", message: { kind: "typed", type: "AddMenuItems" } },
  { receiver: "internal", message: { kind: "typed", type: "DeleteMenuItems" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "UpdateRestaurantDetails" },
  },
  { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
];

export class TonFoodMiniApp implements Contract {
  static async init() {
    return await TonFoodMiniApp_init();
  }

  static async fromInit() {
    const init = await TonFoodMiniApp_init();
    const address = contractAddress(0, init);
    return new TonFoodMiniApp(address, init);
  }

  static fromAddress(address: Address) {
    return new TonFoodMiniApp(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: TonFoodMiniApp_types,
    getters: TonFoodMiniApp_getters,
    receivers: TonFoodMiniApp_receivers,
    errors: TonFoodMiniApp_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message:
      | CreateRestaurant
      | CreateOrder
      | AcceptOrder
      | DeliverOrder
      | CancelOrder
      | RejectOrder
      | AddMenuItems
      | DeleteMenuItems
      | UpdateRestaurantDetails
      | Deploy
  ) {
    let body: Cell | null = null;
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "CreateRestaurant"
    ) {
      body = beginCell().store(storeCreateRestaurant(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "CreateOrder"
    ) {
      body = beginCell().store(storeCreateOrder(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "AcceptOrder"
    ) {
      body = beginCell().store(storeAcceptOrder(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "DeliverOrder"
    ) {
      body = beginCell().store(storeDeliverOrder(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "CancelOrder"
    ) {
      body = beginCell().store(storeCancelOrder(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "RejectOrder"
    ) {
      body = beginCell().store(storeRejectOrder(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "AddMenuItems"
    ) {
      body = beginCell().store(storeAddMenuItems(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "DeleteMenuItems"
    ) {
      body = beginCell().store(storeDeleteMenuItems(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "UpdateRestaurantDetails"
    ) {
      body = beginCell().store(storeUpdateRestaurantDetails(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "Deploy"
    ) {
      body = beginCell().store(storeDeploy(message)).endCell();
    }
    if (body === null) {
      throw new Error("Invalid message type");
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getInQueueOrders(provider: ContractProvider, restaurantId: Address) {
    let builder = new TupleBuilder();
    builder.writeAddress(restaurantId);
    let source = (await provider.get("inQueueOrders", builder.build())).stack;
    const result = loadTupleArray_Order(source);
    return result;
  }

  async getAcceptedOrders(provider: ContractProvider, restaurantId: Address) {
    let builder = new TupleBuilder();
    builder.writeAddress(restaurantId);
    let source = (await provider.get("acceptedOrders", builder.build())).stack;
    const result = loadTupleArray_Order(source);
    return result;
  }

  async getDeliveredOrders(provider: ContractProvider, restaurantId: Address) {
    let builder = new TupleBuilder();
    builder.writeAddress(restaurantId);
    let source = (await provider.get("deliveredOrders", builder.build())).stack;
    const result = loadTupleArray_Order(source);
    return result;
  }

  async getCancelledOrders(provider: ContractProvider, restaurantId: Address) {
    let builder = new TupleBuilder();
    builder.writeAddress(restaurantId);
    let source = (await provider.get("cancelledOrders", builder.build())).stack;
    const result = loadTupleArray_Order(source);
    return result;
  }

  async getRejectedOrders(provider: ContractProvider, restaurantId: Address) {
    let builder = new TupleBuilder();
    builder.writeAddress(restaurantId);
    let source = (await provider.get("rejectedOrders", builder.build())).stack;
    const result = loadTupleArray_Order(source);
    return result;
  }

  async getAllOrders(provider: ContractProvider, restaurantId: Address) {
    let builder = new TupleBuilder();
    builder.writeAddress(restaurantId);
    let source = (await provider.get("allOrders", builder.build())).stack;
    const result = loadTupleArray_Order(source);
    return result;
  }

  async getAllUserOrders(provider: ContractProvider, userId: Address) {
    let builder = new TupleBuilder();
    builder.writeAddress(userId);
    let source = (await provider.get("allUserOrders", builder.build())).stack;
    const result = loadTupleArray_Order(source);
    return result;
  }

  async getAllRestaurants(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("allRestaurants", builder.build())).stack;
    const result = loadTupleArray_Restaurant(source);
    return result;
  }

  async getRestaurantById(provider: ContractProvider, restaurantId: Address) {
    let builder = new TupleBuilder();
    builder.writeAddress(restaurantId);
    let source = (await provider.get("restaurantById", builder.build())).stack;
    const result = loadTupleArray_Restaurant(source);
    return result;
  }

  async getIsVendorPresent(provider: ContractProvider, restaurantId: Address) {
    let builder = new TupleBuilder();
    builder.writeAddress(restaurantId);
    let source = (await provider.get("isVendorPresent", builder.build())).stack;
    let result = source.readBoolean();
    return result;
  }
}
