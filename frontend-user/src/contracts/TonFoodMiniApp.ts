import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
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
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

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
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

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
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
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
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

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
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type Array_Order = {
    $$type: 'Array_Order';
    Map: Dictionary<number, Order>;
    length: bigint;
}

export function storeArray_Order(src: Array_Order) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.Map, Dictionary.Keys.Uint(16), dictValueParserOrder());
        b_0.storeInt(src.length, 257);
    };
}

export function loadArray_Order(slice: Slice) {
    let sc_0 = slice;
    let _Map = Dictionary.load(Dictionary.Keys.Uint(16), dictValueParserOrder(), sc_0);
    let _length = sc_0.loadIntBig(257);
    return { $$type: 'Array_Order' as const, Map: _Map, length: _length };
}

function loadTupleArray_Order(source: TupleReader) {
    let _Map = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserOrder(), source.readCellOpt());
    let _length = source.readBigNumber();
    return { $$type: 'Array_Order' as const, Map: _Map, length: _length };
}

function storeTupleArray_Order(source: Array_Order) {
    let builder = new TupleBuilder();
    builder.writeCell(source.Map.size > 0 ? beginCell().storeDictDirect(source.Map, Dictionary.Keys.Uint(16), dictValueParserOrder()).endCell() : null);
    builder.writeNumber(source.length);
    return builder.build();
}

function dictValueParserArray_Order(): DictionaryValue<Array_Order> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeArray_Order(src)).endCell());
        },
        parse: (src) => {
            return loadArray_Order(src.loadRef().beginParse());
        }
    }
}

export type Array_Item = {
    $$type: 'Array_Item';
    Map: Dictionary<number, Item>;
    length: bigint;
}

export function storeArray_Item(src: Array_Item) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.Map, Dictionary.Keys.Uint(16), dictValueParserItem());
        b_0.storeInt(src.length, 257);
    };
}

export function loadArray_Item(slice: Slice) {
    let sc_0 = slice;
    let _Map = Dictionary.load(Dictionary.Keys.Uint(16), dictValueParserItem(), sc_0);
    let _length = sc_0.loadIntBig(257);
    return { $$type: 'Array_Item' as const, Map: _Map, length: _length };
}

function loadTupleArray_Item(source: TupleReader) {
    let _Map = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserItem(), source.readCellOpt());
    let _length = source.readBigNumber();
    return { $$type: 'Array_Item' as const, Map: _Map, length: _length };
}

function storeTupleArray_Item(source: Array_Item) {
    let builder = new TupleBuilder();
    builder.writeCell(source.Map.size > 0 ? beginCell().storeDictDirect(source.Map, Dictionary.Keys.Uint(16), dictValueParserItem()).endCell() : null);
    builder.writeNumber(source.length);
    return builder.build();
}

function dictValueParserArray_Item(): DictionaryValue<Array_Item> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeArray_Item(src)).endCell());
        },
        parse: (src) => {
            return loadArray_Item(src.loadRef().beginParse());
        }
    }
}

export type Array_ItemIds = {
    $$type: 'Array_ItemIds';
    Map: Dictionary<number, number>;
    length: bigint;
}

export function storeArray_ItemIds(src: Array_ItemIds) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.Map, Dictionary.Keys.Uint(16), Dictionary.Values.Uint(16));
        b_0.storeInt(src.length, 257);
    };
}

export function loadArray_ItemIds(slice: Slice) {
    let sc_0 = slice;
    let _Map = Dictionary.load(Dictionary.Keys.Uint(16), Dictionary.Values.Uint(16), sc_0);
    let _length = sc_0.loadIntBig(257);
    return { $$type: 'Array_ItemIds' as const, Map: _Map, length: _length };
}

function loadTupleArray_ItemIds(source: TupleReader) {
    let _Map = Dictionary.loadDirect(Dictionary.Keys.Uint(16), Dictionary.Values.Uint(16), source.readCellOpt());
    let _length = source.readBigNumber();
    return { $$type: 'Array_ItemIds' as const, Map: _Map, length: _length };
}

function storeTupleArray_ItemIds(source: Array_ItemIds) {
    let builder = new TupleBuilder();
    builder.writeCell(source.Map.size > 0 ? beginCell().storeDictDirect(source.Map, Dictionary.Keys.Uint(16), Dictionary.Values.Uint(16)).endCell() : null);
    builder.writeNumber(source.length);
    return builder.build();
}

function dictValueParserArray_ItemIds(): DictionaryValue<Array_ItemIds> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeArray_ItemIds(src)).endCell());
        },
        parse: (src) => {
            return loadArray_ItemIds(src.loadRef().beginParse());
        }
    }
}

export type Array_MenuItem = {
    $$type: 'Array_MenuItem';
    Map: Dictionary<number, MenuItem>;
    length: bigint;
}

export function storeArray_MenuItem(src: Array_MenuItem) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.Map, Dictionary.Keys.Uint(16), dictValueParserMenuItem());
        b_0.storeInt(src.length, 257);
    };
}

export function loadArray_MenuItem(slice: Slice) {
    let sc_0 = slice;
    let _Map = Dictionary.load(Dictionary.Keys.Uint(16), dictValueParserMenuItem(), sc_0);
    let _length = sc_0.loadIntBig(257);
    return { $$type: 'Array_MenuItem' as const, Map: _Map, length: _length };
}

function loadTupleArray_MenuItem(source: TupleReader) {
    let _Map = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserMenuItem(), source.readCellOpt());
    let _length = source.readBigNumber();
    return { $$type: 'Array_MenuItem' as const, Map: _Map, length: _length };
}

function storeTupleArray_MenuItem(source: Array_MenuItem) {
    let builder = new TupleBuilder();
    builder.writeCell(source.Map.size > 0 ? beginCell().storeDictDirect(source.Map, Dictionary.Keys.Uint(16), dictValueParserMenuItem()).endCell() : null);
    builder.writeNumber(source.length);
    return builder.build();
}

function dictValueParserArray_MenuItem(): DictionaryValue<Array_MenuItem> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeArray_MenuItem(src)).endCell());
        },
        parse: (src) => {
            return loadArray_MenuItem(src.loadRef().beginParse());
        }
    }
}

export type Array_OrderItem = {
    $$type: 'Array_OrderItem';
    Map: Dictionary<number, OrderItem>;
    length: bigint;
}

export function storeArray_OrderItem(src: Array_OrderItem) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.Map, Dictionary.Keys.Uint(16), dictValueParserOrderItem());
        b_0.storeInt(src.length, 257);
    };
}

export function loadArray_OrderItem(slice: Slice) {
    let sc_0 = slice;
    let _Map = Dictionary.load(Dictionary.Keys.Uint(16), dictValueParserOrderItem(), sc_0);
    let _length = sc_0.loadIntBig(257);
    return { $$type: 'Array_OrderItem' as const, Map: _Map, length: _length };
}

function loadTupleArray_OrderItem(source: TupleReader) {
    let _Map = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserOrderItem(), source.readCellOpt());
    let _length = source.readBigNumber();
    return { $$type: 'Array_OrderItem' as const, Map: _Map, length: _length };
}

function storeTupleArray_OrderItem(source: Array_OrderItem) {
    let builder = new TupleBuilder();
    builder.writeCell(source.Map.size > 0 ? beginCell().storeDictDirect(source.Map, Dictionary.Keys.Uint(16), dictValueParserOrderItem()).endCell() : null);
    builder.writeNumber(source.length);
    return builder.build();
}

function dictValueParserArray_OrderItem(): DictionaryValue<Array_OrderItem> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeArray_OrderItem(src)).endCell());
        },
        parse: (src) => {
            return loadArray_OrderItem(src.loadRef().beginParse());
        }
    }
}

export type Array_Restaurant = {
    $$type: 'Array_Restaurant';
    Map: Dictionary<number, Restaurant>;
    length: bigint;
}

export function storeArray_Restaurant(src: Array_Restaurant) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.Map, Dictionary.Keys.Uint(16), dictValueParserRestaurant());
        b_0.storeInt(src.length, 257);
    };
}

export function loadArray_Restaurant(slice: Slice) {
    let sc_0 = slice;
    let _Map = Dictionary.load(Dictionary.Keys.Uint(16), dictValueParserRestaurant(), sc_0);
    let _length = sc_0.loadIntBig(257);
    return { $$type: 'Array_Restaurant' as const, Map: _Map, length: _length };
}

function loadTupleArray_Restaurant(source: TupleReader) {
    let _Map = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserRestaurant(), source.readCellOpt());
    let _length = source.readBigNumber();
    return { $$type: 'Array_Restaurant' as const, Map: _Map, length: _length };
}

function storeTupleArray_Restaurant(source: Array_Restaurant) {
    let builder = new TupleBuilder();
    builder.writeCell(source.Map.size > 0 ? beginCell().storeDictDirect(source.Map, Dictionary.Keys.Uint(16), dictValueParserRestaurant()).endCell() : null);
    builder.writeNumber(source.length);
    return builder.build();
}

function dictValueParserArray_Restaurant(): DictionaryValue<Array_Restaurant> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeArray_Restaurant(src)).endCell());
        },
        parse: (src) => {
            return loadArray_Restaurant(src.loadRef().beginParse());
        }
    }
}

export type Restaurant = {
    $$type: 'Restaurant';
    restaurantId: bigint;
    name: string;
    imageUrl: string;
    description: string;
    vendorDetails: User;
    menu: Array_MenuItem;
}

export function storeRestaurant(src: Restaurant) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.restaurantId, 256);
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
    let _restaurantId = sc_0.loadUintBig(256);
    let _name = sc_0.loadStringRefTail();
    let _imageUrl = sc_0.loadStringRefTail();
    let _description = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _vendorDetails = loadUser(sc_1);
    let sc_2 = sc_1.loadRef().beginParse();
    let _menu = loadArray_MenuItem(sc_2);
    return { $$type: 'Restaurant' as const, restaurantId: _restaurantId, name: _name, imageUrl: _imageUrl, description: _description, vendorDetails: _vendorDetails, menu: _menu };
}

function loadTupleRestaurant(source: TupleReader) {
    let _restaurantId = source.readBigNumber();
    let _name = source.readString();
    let _imageUrl = source.readString();
    let _description = source.readString();
    const _vendorDetails = loadTupleUser(source.readTuple());
    const _menu = loadTupleArray_MenuItem(source.readTuple());
    return { $$type: 'Restaurant' as const, restaurantId: _restaurantId, name: _name, imageUrl: _imageUrl, description: _description, vendorDetails: _vendorDetails, menu: _menu };
}

function storeTupleRestaurant(source: Restaurant) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.restaurantId);
    builder.writeString(source.name);
    builder.writeString(source.imageUrl);
    builder.writeString(source.description);
    builder.writeTuple(storeTupleUser(source.vendorDetails));
    builder.writeTuple(storeTupleArray_MenuItem(source.menu));
    return builder.build();
}

function dictValueParserRestaurant(): DictionaryValue<Restaurant> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRestaurant(src)).endCell());
        },
        parse: (src) => {
            return loadRestaurant(src.loadRef().beginParse());
        }
    }
}

export type Order = {
    $$type: 'Order';
    restaurantId: bigint;
    orderId: bigint;
    items: Array_OrderItem;
    userDetails: User;
    billingDetails: BillingDetails;
    status: bigint;
    createdAt: bigint;
}

export function storeOrder(src: Order) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.restaurantId, 256);
        b_0.storeUint(src.orderId, 256);
        b_0.store(storeArray_OrderItem(src.items));
        let b_1 = new Builder();
        b_1.store(storeUser(src.userDetails));
        b_1.store(storeBillingDetails(src.billingDetails));
        b_1.storeUint(src.status, 8);
        b_1.storeInt(src.createdAt, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadOrder(slice: Slice) {
    let sc_0 = slice;
    let _restaurantId = sc_0.loadUintBig(256);
    let _orderId = sc_0.loadUintBig(256);
    let _items = loadArray_OrderItem(sc_0);
    let sc_1 = sc_0.loadRef().beginParse();
    let _userDetails = loadUser(sc_1);
    let _billingDetails = loadBillingDetails(sc_1);
    let _status = sc_1.loadUintBig(8);
    let _createdAt = sc_1.loadIntBig(257);
    return { $$type: 'Order' as const, restaurantId: _restaurantId, orderId: _orderId, items: _items, userDetails: _userDetails, billingDetails: _billingDetails, status: _status, createdAt: _createdAt };
}

function loadTupleOrder(source: TupleReader) {
    let _restaurantId = source.readBigNumber();
    let _orderId = source.readBigNumber();
    const _items = loadTupleArray_OrderItem(source.readTuple());
    const _userDetails = loadTupleUser(source.readTuple());
    const _billingDetails = loadTupleBillingDetails(source.readTuple());
    let _status = source.readBigNumber();
    let _createdAt = source.readBigNumber();
    return { $$type: 'Order' as const, restaurantId: _restaurantId, orderId: _orderId, items: _items, userDetails: _userDetails, billingDetails: _billingDetails, status: _status, createdAt: _createdAt };
}

function storeTupleOrder(source: Order) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.restaurantId);
    builder.writeNumber(source.orderId);
    builder.writeTuple(storeTupleArray_OrderItem(source.items));
    builder.writeTuple(storeTupleUser(source.userDetails));
    builder.writeTuple(storeTupleBillingDetails(source.billingDetails));
    builder.writeNumber(source.status);
    builder.writeNumber(source.createdAt);
    return builder.build();
}

function dictValueParserOrder(): DictionaryValue<Order> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOrder(src)).endCell());
        },
        parse: (src) => {
            return loadOrder(src.loadRef().beginParse());
        }
    }
}

export type User = {
    $$type: 'User';
    walletAddress: Address;
    name: string;
    phoneNumber: string;
    location: string;
}

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
    return { $$type: 'User' as const, walletAddress: _walletAddress, name: _name, phoneNumber: _phoneNumber, location: _location };
}

function loadTupleUser(source: TupleReader) {
    let _walletAddress = source.readAddress();
    let _name = source.readString();
    let _phoneNumber = source.readString();
    let _location = source.readString();
    return { $$type: 'User' as const, walletAddress: _walletAddress, name: _name, phoneNumber: _phoneNumber, location: _location };
}

function storeTupleUser(source: User) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.walletAddress);
    builder.writeString(source.name);
    builder.writeString(source.phoneNumber);
    builder.writeString(source.location);
    return builder.build();
}

function dictValueParserUser(): DictionaryValue<User> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUser(src)).endCell());
        },
        parse: (src) => {
            return loadUser(src.loadRef().beginParse());
        }
    }
}

export type Item = {
    $$type: 'Item';
    name: string;
    description: string;
    price: bigint;
    imageUrl: string;
}

export function storeItem(src: Item) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.description);
        b_0.storeUint(src.price, 32);
        b_0.storeStringRefTail(src.imageUrl);
    };
}

export function loadItem(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _description = sc_0.loadStringRefTail();
    let _price = sc_0.loadUintBig(32);
    let _imageUrl = sc_0.loadStringRefTail();
    return { $$type: 'Item' as const, name: _name, description: _description, price: _price, imageUrl: _imageUrl };
}

function loadTupleItem(source: TupleReader) {
    let _name = source.readString();
    let _description = source.readString();
    let _price = source.readBigNumber();
    let _imageUrl = source.readString();
    return { $$type: 'Item' as const, name: _name, description: _description, price: _price, imageUrl: _imageUrl };
}

function storeTupleItem(source: Item) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeString(source.description);
    builder.writeNumber(source.price);
    builder.writeString(source.imageUrl);
    return builder.build();
}

function dictValueParserItem(): DictionaryValue<Item> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeItem(src)).endCell());
        },
        parse: (src) => {
            return loadItem(src.loadRef().beginParse());
        }
    }
}

export type MenuItem = {
    $$type: 'MenuItem';
    id: bigint;
    name: string;
    description: string;
    price: bigint;
    imageUrl: string;
    isDeleted: boolean;
}

export function storeMenuItem(src: MenuItem) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.id, 256);
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.description);
        b_0.storeUint(src.price, 32);
        b_0.storeStringRefTail(src.imageUrl);
        b_0.storeBit(src.isDeleted);
    };
}

export function loadMenuItem(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadUintBig(256);
    let _name = sc_0.loadStringRefTail();
    let _description = sc_0.loadStringRefTail();
    let _price = sc_0.loadUintBig(32);
    let _imageUrl = sc_0.loadStringRefTail();
    let _isDeleted = sc_0.loadBit();
    return { $$type: 'MenuItem' as const, id: _id, name: _name, description: _description, price: _price, imageUrl: _imageUrl, isDeleted: _isDeleted };
}

function loadTupleMenuItem(source: TupleReader) {
    let _id = source.readBigNumber();
    let _name = source.readString();
    let _description = source.readString();
    let _price = source.readBigNumber();
    let _imageUrl = source.readString();
    let _isDeleted = source.readBoolean();
    return { $$type: 'MenuItem' as const, id: _id, name: _name, description: _description, price: _price, imageUrl: _imageUrl, isDeleted: _isDeleted };
}

function storeTupleMenuItem(source: MenuItem) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeString(source.name);
    builder.writeString(source.description);
    builder.writeNumber(source.price);
    builder.writeString(source.imageUrl);
    builder.writeBoolean(source.isDeleted);
    return builder.build();
}

function dictValueParserMenuItem(): DictionaryValue<MenuItem> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMenuItem(src)).endCell());
        },
        parse: (src) => {
            return loadMenuItem(src.loadRef().beginParse());
        }
    }
}

export type OrderItem = {
    $$type: 'OrderItem';
    id: bigint;
    quantity: bigint;
}

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
    return { $$type: 'OrderItem' as const, id: _id, quantity: _quantity };
}

function loadTupleOrderItem(source: TupleReader) {
    let _id = source.readBigNumber();
    let _quantity = source.readBigNumber();
    return { $$type: 'OrderItem' as const, id: _id, quantity: _quantity };
}

function storeTupleOrderItem(source: OrderItem) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeNumber(source.quantity);
    return builder.build();
}

function dictValueParserOrderItem(): DictionaryValue<OrderItem> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOrderItem(src)).endCell());
        },
        parse: (src) => {
            return loadOrderItem(src.loadRef().beginParse());
        }
    }
}

export type BillingDetails = {
    $$type: 'BillingDetails';
    totalAmount: bigint;
}

export function storeBillingDetails(src: BillingDetails) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.totalAmount, 256);
    };
}

export function loadBillingDetails(slice: Slice) {
    let sc_0 = slice;
    let _totalAmount = sc_0.loadUintBig(256);
    return { $$type: 'BillingDetails' as const, totalAmount: _totalAmount };
}

function loadTupleBillingDetails(source: TupleReader) {
    let _totalAmount = source.readBigNumber();
    return { $$type: 'BillingDetails' as const, totalAmount: _totalAmount };
}

function storeTupleBillingDetails(source: BillingDetails) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.totalAmount);
    return builder.build();
}

function dictValueParserBillingDetails(): DictionaryValue<BillingDetails> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBillingDetails(src)).endCell());
        },
        parse: (src) => {
            return loadBillingDetails(src.loadRef().beginParse());
        }
    }
}

export type CreateRestaurant = {
    $$type: 'CreateRestaurant';
    restaurantId: bigint;
    restaurantName: string;
    restaurantImageUrl: string;
    restaurantDescription: string;
    vendorDetails: User;
    menuItems: Array_Item;
}

export function storeCreateRestaurant(src: CreateRestaurant) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2886349954, 32);
        b_0.storeUint(src.restaurantId, 256);
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
    if (sc_0.loadUint(32) !== 2886349954) { throw Error('Invalid prefix'); }
    let _restaurantId = sc_0.loadUintBig(256);
    let _restaurantName = sc_0.loadStringRefTail();
    let _restaurantImageUrl = sc_0.loadStringRefTail();
    let _restaurantDescription = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _vendorDetails = loadUser(sc_1);
    let sc_2 = sc_1.loadRef().beginParse();
    let _menuItems = loadArray_Item(sc_2);
    return { $$type: 'CreateRestaurant' as const, restaurantId: _restaurantId, restaurantName: _restaurantName, restaurantImageUrl: _restaurantImageUrl, restaurantDescription: _restaurantDescription, vendorDetails: _vendorDetails, menuItems: _menuItems };
}

function loadTupleCreateRestaurant(source: TupleReader) {
    let _restaurantId = source.readBigNumber();
    let _restaurantName = source.readString();
    let _restaurantImageUrl = source.readString();
    let _restaurantDescription = source.readString();
    const _vendorDetails = loadTupleUser(source.readTuple());
    const _menuItems = loadTupleArray_Item(source.readTuple());
    return { $$type: 'CreateRestaurant' as const, restaurantId: _restaurantId, restaurantName: _restaurantName, restaurantImageUrl: _restaurantImageUrl, restaurantDescription: _restaurantDescription, vendorDetails: _vendorDetails, menuItems: _menuItems };
}

function storeTupleCreateRestaurant(source: CreateRestaurant) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.restaurantId);
    builder.writeString(source.restaurantName);
    builder.writeString(source.restaurantImageUrl);
    builder.writeString(source.restaurantDescription);
    builder.writeTuple(storeTupleUser(source.vendorDetails));
    builder.writeTuple(storeTupleArray_Item(source.menuItems));
    return builder.build();
}

function dictValueParserCreateRestaurant(): DictionaryValue<CreateRestaurant> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateRestaurant(src)).endCell());
        },
        parse: (src) => {
            return loadCreateRestaurant(src.loadRef().beginParse());
        }
    }
}

export type CreateOrder = {
    $$type: 'CreateOrder';
    restaurantId: bigint;
    items: Array_OrderItem;
    userDetails: User;
    billingDetails: BillingDetails;
}

export function storeCreateOrder(src: CreateOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(122217544, 32);
        b_0.storeUint(src.restaurantId, 256);
        b_0.store(storeArray_OrderItem(src.items));
        let b_1 = new Builder();
        b_1.store(storeUser(src.userDetails));
        b_1.store(storeBillingDetails(src.billingDetails));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCreateOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 122217544) { throw Error('Invalid prefix'); }
    let _restaurantId = sc_0.loadUintBig(256);
    let _items = loadArray_OrderItem(sc_0);
    let sc_1 = sc_0.loadRef().beginParse();
    let _userDetails = loadUser(sc_1);
    let _billingDetails = loadBillingDetails(sc_1);
    return { $$type: 'CreateOrder' as const, restaurantId: _restaurantId, items: _items, userDetails: _userDetails, billingDetails: _billingDetails };
}

function loadTupleCreateOrder(source: TupleReader) {
    let _restaurantId = source.readBigNumber();
    const _items = loadTupleArray_OrderItem(source.readTuple());
    const _userDetails = loadTupleUser(source.readTuple());
    const _billingDetails = loadTupleBillingDetails(source.readTuple());
    return { $$type: 'CreateOrder' as const, restaurantId: _restaurantId, items: _items, userDetails: _userDetails, billingDetails: _billingDetails };
}

function storeTupleCreateOrder(source: CreateOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.restaurantId);
    builder.writeTuple(storeTupleArray_OrderItem(source.items));
    builder.writeTuple(storeTupleUser(source.userDetails));
    builder.writeTuple(storeTupleBillingDetails(source.billingDetails));
    return builder.build();
}

function dictValueParserCreateOrder(): DictionaryValue<CreateOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateOrder(src.loadRef().beginParse());
        }
    }
}

export type DeliverOrder = {
    $$type: 'DeliverOrder';
    restaurantId: bigint;
    orderId: bigint;
}

export function storeDeliverOrder(src: DeliverOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2273716514, 32);
        b_0.storeUint(src.restaurantId, 256);
        b_0.storeUint(src.orderId, 256);
    };
}

export function loadDeliverOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2273716514) { throw Error('Invalid prefix'); }
    let _restaurantId = sc_0.loadUintBig(256);
    let _orderId = sc_0.loadUintBig(256);
    return { $$type: 'DeliverOrder' as const, restaurantId: _restaurantId, orderId: _orderId };
}

function loadTupleDeliverOrder(source: TupleReader) {
    let _restaurantId = source.readBigNumber();
    let _orderId = source.readBigNumber();
    return { $$type: 'DeliverOrder' as const, restaurantId: _restaurantId, orderId: _orderId };
}

function storeTupleDeliverOrder(source: DeliverOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.restaurantId);
    builder.writeNumber(source.orderId);
    return builder.build();
}

function dictValueParserDeliverOrder(): DictionaryValue<DeliverOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeliverOrder(src)).endCell());
        },
        parse: (src) => {
            return loadDeliverOrder(src.loadRef().beginParse());
        }
    }
}

export type CancelOrder = {
    $$type: 'CancelOrder';
    restaurantId: bigint;
    orderId: bigint;
}

export function storeCancelOrder(src: CancelOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2398220735, 32);
        b_0.storeUint(src.restaurantId, 256);
        b_0.storeUint(src.orderId, 256);
    };
}

export function loadCancelOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2398220735) { throw Error('Invalid prefix'); }
    let _restaurantId = sc_0.loadUintBig(256);
    let _orderId = sc_0.loadUintBig(256);
    return { $$type: 'CancelOrder' as const, restaurantId: _restaurantId, orderId: _orderId };
}

function loadTupleCancelOrder(source: TupleReader) {
    let _restaurantId = source.readBigNumber();
    let _orderId = source.readBigNumber();
    return { $$type: 'CancelOrder' as const, restaurantId: _restaurantId, orderId: _orderId };
}

function storeTupleCancelOrder(source: CancelOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.restaurantId);
    builder.writeNumber(source.orderId);
    return builder.build();
}

function dictValueParserCancelOrder(): DictionaryValue<CancelOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCancelOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCancelOrder(src.loadRef().beginParse());
        }
    }
}

export type AcceptOrder = {
    $$type: 'AcceptOrder';
    restaurantId: bigint;
    orderId: bigint;
}

export function storeAcceptOrder(src: AcceptOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3748971678, 32);
        b_0.storeUint(src.restaurantId, 256);
        b_0.storeUint(src.orderId, 256);
    };
}

export function loadAcceptOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3748971678) { throw Error('Invalid prefix'); }
    let _restaurantId = sc_0.loadUintBig(256);
    let _orderId = sc_0.loadUintBig(256);
    return { $$type: 'AcceptOrder' as const, restaurantId: _restaurantId, orderId: _orderId };
}

function loadTupleAcceptOrder(source: TupleReader) {
    let _restaurantId = source.readBigNumber();
    let _orderId = source.readBigNumber();
    return { $$type: 'AcceptOrder' as const, restaurantId: _restaurantId, orderId: _orderId };
}

function storeTupleAcceptOrder(source: AcceptOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.restaurantId);
    builder.writeNumber(source.orderId);
    return builder.build();
}

function dictValueParserAcceptOrder(): DictionaryValue<AcceptOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAcceptOrder(src)).endCell());
        },
        parse: (src) => {
            return loadAcceptOrder(src.loadRef().beginParse());
        }
    }
}

export type RejectOrder = {
    $$type: 'RejectOrder';
    restaurantId: bigint;
    orderId: bigint;
}

export function storeRejectOrder(src: RejectOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1800748732, 32);
        b_0.storeUint(src.restaurantId, 256);
        b_0.storeUint(src.orderId, 256);
    };
}

export function loadRejectOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1800748732) { throw Error('Invalid prefix'); }
    let _restaurantId = sc_0.loadUintBig(256);
    let _orderId = sc_0.loadUintBig(256);
    return { $$type: 'RejectOrder' as const, restaurantId: _restaurantId, orderId: _orderId };
}

function loadTupleRejectOrder(source: TupleReader) {
    let _restaurantId = source.readBigNumber();
    let _orderId = source.readBigNumber();
    return { $$type: 'RejectOrder' as const, restaurantId: _restaurantId, orderId: _orderId };
}

function storeTupleRejectOrder(source: RejectOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.restaurantId);
    builder.writeNumber(source.orderId);
    return builder.build();
}

function dictValueParserRejectOrder(): DictionaryValue<RejectOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRejectOrder(src)).endCell());
        },
        parse: (src) => {
            return loadRejectOrder(src.loadRef().beginParse());
        }
    }
}

export type AddMenuItems = {
    $$type: 'AddMenuItems';
    restaurantId: bigint;
    items: Array_Item;
}

export function storeAddMenuItems(src: AddMenuItems) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1604921073, 32);
        b_0.storeUint(src.restaurantId, 256);
        b_0.store(storeArray_Item(src.items));
    };
}

export function loadAddMenuItems(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1604921073) { throw Error('Invalid prefix'); }
    let _restaurantId = sc_0.loadUintBig(256);
    let _items = loadArray_Item(sc_0);
    return { $$type: 'AddMenuItems' as const, restaurantId: _restaurantId, items: _items };
}

function loadTupleAddMenuItems(source: TupleReader) {
    let _restaurantId = source.readBigNumber();
    const _items = loadTupleArray_Item(source.readTuple());
    return { $$type: 'AddMenuItems' as const, restaurantId: _restaurantId, items: _items };
}

function storeTupleAddMenuItems(source: AddMenuItems) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.restaurantId);
    builder.writeTuple(storeTupleArray_Item(source.items));
    return builder.build();
}

function dictValueParserAddMenuItems(): DictionaryValue<AddMenuItems> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAddMenuItems(src)).endCell());
        },
        parse: (src) => {
            return loadAddMenuItems(src.loadRef().beginParse());
        }
    }
}

export type DeleteMenuItems = {
    $$type: 'DeleteMenuItems';
    restaurantId: bigint;
    items: Array_ItemIds;
}

export function storeDeleteMenuItems(src: DeleteMenuItems) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4252850054, 32);
        b_0.storeUint(src.restaurantId, 256);
        b_0.store(storeArray_ItemIds(src.items));
    };
}

export function loadDeleteMenuItems(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4252850054) { throw Error('Invalid prefix'); }
    let _restaurantId = sc_0.loadUintBig(256);
    let _items = loadArray_ItemIds(sc_0);
    return { $$type: 'DeleteMenuItems' as const, restaurantId: _restaurantId, items: _items };
}

function loadTupleDeleteMenuItems(source: TupleReader) {
    let _restaurantId = source.readBigNumber();
    const _items = loadTupleArray_ItemIds(source.readTuple());
    return { $$type: 'DeleteMenuItems' as const, restaurantId: _restaurantId, items: _items };
}

function storeTupleDeleteMenuItems(source: DeleteMenuItems) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.restaurantId);
    builder.writeTuple(storeTupleArray_ItemIds(source.items));
    return builder.build();
}

function dictValueParserDeleteMenuItems(): DictionaryValue<DeleteMenuItems> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeleteMenuItems(src)).endCell());
        },
        parse: (src) => {
            return loadDeleteMenuItems(src.loadRef().beginParse());
        }
    }
}

export type UpdateRestaurantDetails = {
    $$type: 'UpdateRestaurantDetails';
    restaurantId: bigint;
    restaurantName: string | null;
    restaurantImageUrl: string | null;
    restaurantDescription: string | null;
    vendorWalletAddress: Address | null;
    vendorName: string | null;
    vendorImageUrl: string | null;
    vendorPhoneNumber: string | null;
    vendorLocation: string | null;
}

export function storeUpdateRestaurantDetails(src: UpdateRestaurantDetails) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2991301209, 32);
        b_0.storeUint(src.restaurantId, 256);
        if (src.restaurantName !== null && src.restaurantName !== undefined) { b_0.storeBit(true).storeStringRefTail(src.restaurantName); } else { b_0.storeBit(false); }
        if (src.restaurantImageUrl !== null && src.restaurantImageUrl !== undefined) { b_0.storeBit(true).storeStringRefTail(src.restaurantImageUrl); } else { b_0.storeBit(false); }
        if (src.restaurantDescription !== null && src.restaurantDescription !== undefined) { b_0.storeBit(true).storeStringRefTail(src.restaurantDescription); } else { b_0.storeBit(false); }
        b_0.storeAddress(src.vendorWalletAddress);
        let b_1 = new Builder();
        if (src.vendorName !== null && src.vendorName !== undefined) { b_1.storeBit(true).storeStringRefTail(src.vendorName); } else { b_1.storeBit(false); }
        if (src.vendorImageUrl !== null && src.vendorImageUrl !== undefined) { b_1.storeBit(true).storeStringRefTail(src.vendorImageUrl); } else { b_1.storeBit(false); }
        if (src.vendorPhoneNumber !== null && src.vendorPhoneNumber !== undefined) { b_1.storeBit(true).storeStringRefTail(src.vendorPhoneNumber); } else { b_1.storeBit(false); }
        let b_2 = new Builder();
        if (src.vendorLocation !== null && src.vendorLocation !== undefined) { b_2.storeBit(true).storeStringRefTail(src.vendorLocation); } else { b_2.storeBit(false); }
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateRestaurantDetails(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2991301209) { throw Error('Invalid prefix'); }
    let _restaurantId = sc_0.loadUintBig(256);
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
    return { $$type: 'UpdateRestaurantDetails' as const, restaurantId: _restaurantId, restaurantName: _restaurantName, restaurantImageUrl: _restaurantImageUrl, restaurantDescription: _restaurantDescription, vendorWalletAddress: _vendorWalletAddress, vendorName: _vendorName, vendorImageUrl: _vendorImageUrl, vendorPhoneNumber: _vendorPhoneNumber, vendorLocation: _vendorLocation };
}

function loadTupleUpdateRestaurantDetails(source: TupleReader) {
    let _restaurantId = source.readBigNumber();
    let _restaurantName = source.readStringOpt();
    let _restaurantImageUrl = source.readStringOpt();
    let _restaurantDescription = source.readStringOpt();
    let _vendorWalletAddress = source.readAddressOpt();
    let _vendorName = source.readStringOpt();
    let _vendorImageUrl = source.readStringOpt();
    let _vendorPhoneNumber = source.readStringOpt();
    let _vendorLocation = source.readStringOpt();
    return { $$type: 'UpdateRestaurantDetails' as const, restaurantId: _restaurantId, restaurantName: _restaurantName, restaurantImageUrl: _restaurantImageUrl, restaurantDescription: _restaurantDescription, vendorWalletAddress: _vendorWalletAddress, vendorName: _vendorName, vendorImageUrl: _vendorImageUrl, vendorPhoneNumber: _vendorPhoneNumber, vendorLocation: _vendorLocation };
}

function storeTupleUpdateRestaurantDetails(source: UpdateRestaurantDetails) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.restaurantId);
    builder.writeString(source.restaurantName);
    builder.writeString(source.restaurantImageUrl);
    builder.writeString(source.restaurantDescription);
    builder.writeAddress(source.vendorWalletAddress);
    builder.writeString(source.vendorName);
    builder.writeString(source.vendorImageUrl);
    builder.writeString(source.vendorPhoneNumber);
    builder.writeString(source.vendorLocation);
    return builder.build();
}

function dictValueParserUpdateRestaurantDetails(): DictionaryValue<UpdateRestaurantDetails> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateRestaurantDetails(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateRestaurantDetails(src.loadRef().beginParse());
        }
    }
}

 type TonFoodMiniApp_init_args = {
    $$type: 'TonFoodMiniApp_init_args';
}

function initTonFoodMiniApp_init_args(src: TonFoodMiniApp_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function TonFoodMiniApp_init() {
    const __code = Cell.fromBase64('te6ccgECZQEAFboAART/APSkE/S88sgLAQIBYgIDApzQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxa2zzy4ILI+EMBzH8BygBZAvQA9ADJ7VRbDgIBIAQFAgEgBgcCASBMTQITu3Z9s8WNs8bCKFsIAgEgCQoBFlMhRDR02zxsIhAjXgITt2M7Z4sbZ42EUFsLAhG0MNtnm2eNhFBbDAGYggCdMCODByNZ9A9voZIwbd8gbpIwbY6H0Ns8bBpvCuJus/L0gwciAln0D2+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG7y0IBvIl8DoCHbPCKDB/SHb6UgkRKVMW0ybQHikI81IG6SMG2Oh9DbPGwabwriIG7y0IBvKhC8EKzbPIMHVEQUWfR8b6UglALUMFiVMW0ybQHiEDToW2wSYF8NAVaCAKXlK6SBE4i78vRVgIAQCshVkNs8ySIQNAEgbpUwWfRbMJRBM/QX4gGkRQRuAZIwf+BwIddJwh+VMCDXCx/eIIIQrAo0grqPCDDbPGwa2zx/4CCCEAdI5Ei64wIgghDfdMSeug8QERIAztMfAYIQrAo0grry4IHT/9QB0AHUAdAB1AHQAdQB0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1AHQAdQB0AHUAdAUQzAE1DDQ9ASBAQHXAFkyEGoQaRBoEGcQRRA0QwAB8DCCAJuMcCDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiCbHBbPy9IIAwkH4QibHBfL0gSLRiwglAfkBAfkBvfL0gStniwgkAfkBAfkBvfL0ggCBF4sIIwH5AQH5Ab3y9IFK2IsIKRMBuDDTHwGCEAdI5Ei68uCB0//0BIEBAdcAWQLUAdD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0AHUAdAB1AHQFEMwBNP/ATEQWBBXEDRBMGwY2zx/GASEj7cw0x8BghDfdMSeuvLggdP/0/9ZbBJx2zz4QnDbPIjIgljAAAAAAAAAAAAAAAABActnzMlw+wB/4CCCEIeGKSK6IkYqHQTgAfkBAfkBvfL0gSUQiwgoAfkBAfkBvfL0gRxHiwgnAfkBAfkBvfL0ggDd6CuDBytZ9A9voZIwbd8gbpIwbY6H0Ns8bBpvCuJu8vTbPCKAEPSHb6UgkRKVMW0ybQHikIroWzIpCQgHBgUEQxNVgIMHCl9gFBUBjiBukjBtjhXQ1AHQAdQB0AHTH9QB0BRDMGwUbwTiIG7y0IBvJCVVMHAQeBBo2zyAEFREFFn0fG+lIJQC1DBYlTFtMm0B4hA0MQR4yFWQ2zzJIhA1ASBulTBZ9FswlEEz9BfigwfbPMhZAvQAgQEBzwDJQUAgbpUwWfRbMJRBM/QX4vhCcNs8RWBGFgEyiMiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABcALAAAAABSZXN0YXVyYW50IGNyZWF0ZWQB9IIAsf0mwgDy9IIAtPFwIMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIJscFs/L0ggDCQfhCJscF8vSBZWqLCCUB+QEB+QG98vSCAMSwiwgkAfkBAfkBvfL0gUf6iwgjAfkBAfkBvfL0GQL2gVVWIcMA8vSCAMoq+EFvJBNfAyK+8vQogwcpWfQPb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbvLQgG8iMVF4B1VBcPgjEJosgwctWfQPb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuJu4wAsgwctWfQPb6GSMG3fGhsBRIMH2zzIWQL0AIEBAc8AyS0QPwEgbpUwWfRbMJRBM/QX4gxgA7YgbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu8tCAbyJVods8AYMHAshZAvQAgQEBzwDJEiBulTBZ9FswlEEz9Bfi+EJw2zyIyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAY0YcACIAAAAAT3JkZXIgY3JlYXRlZASEj7cw0x8BghCHhikiuvLggdP/0/9ZbBJy2zz4QnDbPIjIgljAAAAAAAAAAAAAAAABActnzMlw+wB/4CCCEI7x8b+6IkYeHwAmAAAAAE9yZGVyIGRlbGl2ZXJlZASEj7cw0x8BghCO8fG/uvLggdP/0/9ZbBJz2zz4QnDbPIjIgljAAAAAAAAAAAAAAAABActnzMlw+wB/4CCCEGtVPry6IkYgIQAmAAAAAE9yZGVyIGNhbmNlbGxlZASEj7cw0x8BghBrVT68uvLggdP/0/9ZbBJ02zz4QnDbPIjIgljAAAAAAAAAAAAAAAABActnzMlw+wB/4CCCEF+pJvG6IkYjJAP2ggCdMCWDByVZ9A9voZIwbd8gbpIwbY6H0Ns8bBpvCuJus/L0gVBtJIMHJVn0D2+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLibrORcOMN8vSBSugkgwclWfQPb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbvLQgG8iXyUmACQAAAAAT3JkZXIgcmVqZWN0ZWQEuo6fMNMfAYIQX6km8bry4IHT//QEgQEB1wBZECNsE9s8f+AgghD9fVeGuo6fMNMfAYIQ/X1Xhrry4IHT//QEgQEB1wBZECNsE9s8f+AgghCyS6JZuuMCghCUapi2uiwtLi8BjCSDByVZ9A9voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu8tCAbyIwgBAkWfQPb6GSMG3fIG6SMG2Oh9DbPGwbbwvibrNiA/4wgBAkWfQPb6GSMG3fIG6SMG2Oh9DbPGwbbwviIG7y0IBvKxpfCsMC8vSBLLYkgwclWfQPb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbvLQgG8iMIAQJFn0D2+hkjBt3yBukjBtjofQ2zxsG28L4iBu8tCAbysaXwrDA/L0YmInA/6BdS8kgwclWfQPb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbvLQgG8iMIAQJFn0D2+hkjBt3yBukjBtjofQ2zxsG28L4iBu8tCAbysaXwrDBPL0ggDCQSWDByVZ9A9voZIwbd8gbpIwbY6H0Ns8bBpvCuIgbvLQgG8qW2xEYl8oAv5fA/hCxwXy9CODByRZ9A9voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu8tCAbyIwgBAjWfQPb6GSMG3fIG6SMG2Oh9DbPGwbbwviIG7y0IBvKzFTrYMHL1n0D2+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG7y0IBvIhB8YikEwBBrEFoQSYAQKVFbEF8QThA9QP/IVaDbPMleIhcgbpUwWfRbMJRBM/QX4oMHAshZAvQAgQEBzwDJEDZBUCBulTBZ9FswlEEz9BfiA8ABjwtyiCNZf1UwbW3bPJEw4vhCAWQqSisAJAAAAABPcmRlciBhY2NlcHRlZAEE2zxGBPaCALH9AcIA8vSCAJ0wJIMHJFn0D2+hkjBt3yBukjBtjofQ2zxsGm8K4m6z8vSCAMJBJIMHJFn0D2+hkjBt3yBukjBtjofQ2zxsGm8K4iBu8tCAbypbbERfA/hCxwXy9CODByNZ9A9voZIwbd8gbpIwbY6H0Ns8bBpvCuJfX18wBPaCALH9AcIA8vSCAJ0wJIMHJFn0D2+hkjBt3yBukjBtjofQ2zxsGm8K4m6z8vSCAMJBJIMHJFn0D2+hkjBt3yBukjBtjofQ2zxsGm8K4iBu8tCAbypbbERfA/hCxwXy9CODByNZ9A9voZIwbd8gbpIwbY6H0Ns8bBpvCuJfX181AhAw2zxsGds8fzw9AViOp9MfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+AwcEkC6CBu8tCAbypsgiKAEPSHb6UgkRKVMW0ybQHikI7HIG6SMG2OFdDUAdAB1AHQAdMf1AHQFEMwbBRvBOIgbvLQgG8kJVUwcBB4EGjbPIAQVEQUWfR8b6UglALUMFiVMW0ybQHiEDToWzIkgwckWfQPb6GSMG3fMTIBVoIApeUnpIETiLvy9FVAgBAGyFVQ2zzJIhA0ASBulTBZ9FswlEEz9BfiAaQ5BHIgbpIwbY6H0Ns8bBpvCuIgbvLQgG8qW1UHgwcKyFWQ2zzJEDQSIG6VMFn0WzCUQTP0F+L4QhJw2zxfRUYzATKIyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsANAAoAAAAAE1lbnUgaXRlbXMgYWRkZWQD+iBu8tCAbypsgoAQVFMAWfSGb6UgllAj1wEwWJZsIW0ybQHikI6rEEcQNlBi2zyAEFMHA1CIQTP0fG+lIJZQI9cBMFiWbCFtMm0B4hBYEEcQNOhbMiSDByRZ9A9voZIwbd8gbpIwbY6H0Ns8bBpvCuIgbvLQgG8qW1UHgwcKNl83Anbtou37cJNTAbmPLFRyENs8MFNIuo6df4AQOshVUNs8yRAkIG6VMFn0WzCUQTP0F+IB2zHgXwWk6DBsEjg5A2zIVZDbPMkQNBIgbpUwWfRbMJRBM/QX4vhCEnDbPIjIgljAAAAAAAAAAAAAAAABActnzMlw+wBFRjsBdoEbIyLCAPL0gUuFIcL/8vQggV3GA7kS8vSAEAFZ9A9voZIwbd8gbpIwbY6H0Ns8bBZvBuIgbvLQgG8mOgA+UFbL/8hQBM8WyVADzMhYzxbJAczLH8hYzxbJAczKAAAo0//UAdAB1AHQAdMf1AHQAdIAVVAALAAAAABNZW51IGl0ZW1zIGRlbGV0ZWQB9NMfAYIQskuiWbry4IHT/9IAAZPUAdCRbeIB0gABk9QB0JFt4gHSAAGT1AHQkW3iASDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4gHUAdDSAAGT1AHQkW3iAdIAAZPUAdCRbeIB0gABPgT0MoIAnTAqgwcqWfQPb6GSMG3fIG6SMG2Oh9DbPGwabwribrPy9IIAwkEqgwcqWfQPb6GSMG3fIG6SMG2Oh9DbPGwabwriIG7y0IBvKltsRF8D+ELHBfL0KYMHKVn0D2+hkjBt3yBukjBtjofQ2zxsGm8K4iBu8tCAbypfX18/AECT1AHQkW3iAdQw0NIAAZPUMNCSMG3iEEkQSBBHEEYQRQP6VhBus44TiwhWEQEhbpJbf5cB+QEB+QG94pFw4pk4DyBu8tCABw+SVxDiLm6zjhKLCFLwIW6SW3+XAfkBAfkBveKRcOKZNg0gbvLQgAUNkT7iLG6zjhKLCFLQIW6SW3+XAfkBAfkBveKRcOKZNAsgbvLQgAMLkTziKm6z4w9AQUIAdHAgyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhSsCFukltwkscF4rMAAnAC/pkyCSBu8tCAUAmROuIobrOOEosIUpAhbpJbf5cB+QEB+QG94pFw4pgwByBu8tCAB5E44iVus44SiwhSYCFuklt/lwH5AQH5Ab3ikXDimTgEIG7y0IAHBJE14iVus44SiwhSYCFuklt/lwH5AQH5Ab3ikXDikTXjDUh2EEUQNAJDRAASOAQgbvLQgAcEA3KDBwrIVZDbPMkQNBIgbpUwWfRbMJRBM/QX4vhCEnDbPIjIgljAAAAAAAAAAAAAAAABActnzMlw+wBFRkcA1FCay//IUAjPFslQB8zIUAbPFslQBczIUATPFslQA8zIQ0QFUEMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIWM8WyQHMyFADzxbJWMzIWM8WyQHMyEA0AvQAgQEBzwDJAczJAcwCMPhBbyQTXwMBoYIJMS0AoXKIf1UwbW3bPEhKADwAAAAAUmVzdGF1cmFudCBkZXRhaWxzIHVwZGF0ZWQAHAAAAABHYXMgcmVmdW5kATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPEoByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsASwCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAC5u70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwG9Sd75VFlvHHU9PeBVnDJoJwnZdOWrNOy3M6DpZtlGbopIAgEgTk8CASBQUQITtE37Z4sbZ42EUFtcAgEgUlMCAnRYWQIBIFRVAhOvbm2eLG2eNhFAW1cAEKq+7UTQ0gABAhKqINs8WNs8bCJbVgEWUyFENHDbPGwiECNeARZTIUQ0cds8bCIQI14CEaJnbPFjbPGwiltaAHOi7jQ1aXBmczovL1FtYVNKRkU0d3pmQ1VFVkFtelJQS2VKdTlQUEFXd3NvREJ3S0gyY1VhUFNEeTSCARZTIUQ0c9s8bCIQI14BQu1E0NQB+GPSAAGX9AT0BFlsEuAw+CjXCwqDCbry4InbPF0BFlMhRDRy2zxsIhAjXgAEbW0DzoIAnTAkgwckWfQPb6GSMG3fIG6SMG2Oh9DbPGwabwribrPy9IMHVEMTWfQPb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbvLQgG8iMNs8IoAQ9IdvpSCREpUxbTJtAeKQiuhbbCJfYGEAtNP/1AHQAdQB0AHUAdAB1AHQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAB1AHQAdQB0BRDMATUMND0BIEBAdcAWTIQahBpEGgQZxBFEDRDAAAEbXACeCBukjBtjofQ2zxsG28L4iBu8tCAbytTH7qOhxDNEL3bPFiSXwvigBAkAln0fG+lIJQC1DBYlTFtMm0B4mJjAK7T/9P/9ASBAQHXAFkC1AHQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAB1AHQAdQB0BRDMATT/wEB0weBAQHXADAQexB6EHkQVhBFEDQBVoIApeUspIETiLvy9FWQgBALyFWg2zzJIhA0ASBulTBZ9FswlEEz9BfiAaRkALZQq8v/GMv/QGUC9ACBAQHPAMhQRAVQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshYzxbJAczIUAPPFslYzMhYzxbJAcxYAcv/EssHEoEBAc8AyQHM');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initTonFoodMiniApp_init_args({ $$type: 'TonFoodMiniApp_init_args' })(builder);
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
    56808: { message: `Restaurant already exists` },
}

const TonFoodMiniApp_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Array_Order","header":null,"fields":[{"name":"Map","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"Order","valueFormat":"ref"}},{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Array_Item","header":null,"fields":[{"name":"Map","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"Item","valueFormat":"ref"}},{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Array_ItemIds","header":null,"fields":[{"name":"Map","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"uint","valueFormat":16}},{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Array_MenuItem","header":null,"fields":[{"name":"Map","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"MenuItem","valueFormat":"ref"}},{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Array_OrderItem","header":null,"fields":[{"name":"Map","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"OrderItem","valueFormat":"ref"}},{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Array_Restaurant","header":null,"fields":[{"name":"Map","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"Restaurant","valueFormat":"ref"}},{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Restaurant","header":null,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"imageUrl","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"vendorDetails","type":{"kind":"simple","type":"User","optional":false}},{"name":"menu","type":{"kind":"simple","type":"Array_MenuItem","optional":false}}]},
    {"name":"Order","header":null,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"items","type":{"kind":"simple","type":"Array_OrderItem","optional":false}},{"name":"userDetails","type":{"kind":"simple","type":"User","optional":false}},{"name":"billingDetails","type":{"kind":"simple","type":"BillingDetails","optional":false}},{"name":"status","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"createdAt","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"User","header":null,"fields":[{"name":"walletAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"phoneNumber","type":{"kind":"simple","type":"string","optional":false}},{"name":"location","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"Item","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"imageUrl","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"MenuItem","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"imageUrl","type":{"kind":"simple","type":"string","optional":false}},{"name":"isDeleted","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"OrderItem","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"quantity","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"BillingDetails","header":null,"fields":[{"name":"totalAmount","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"CreateRestaurant","header":2886349954,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"restaurantName","type":{"kind":"simple","type":"string","optional":false}},{"name":"restaurantImageUrl","type":{"kind":"simple","type":"string","optional":false}},{"name":"restaurantDescription","type":{"kind":"simple","type":"string","optional":false}},{"name":"vendorDetails","type":{"kind":"simple","type":"User","optional":false}},{"name":"menuItems","type":{"kind":"simple","type":"Array_Item","optional":false}}]},
    {"name":"CreateOrder","header":122217544,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"items","type":{"kind":"simple","type":"Array_OrderItem","optional":false}},{"name":"userDetails","type":{"kind":"simple","type":"User","optional":false}},{"name":"billingDetails","type":{"kind":"simple","type":"BillingDetails","optional":false}}]},
    {"name":"DeliverOrder","header":2273716514,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"CancelOrder","header":2398220735,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"AcceptOrder","header":3748971678,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"RejectOrder","header":1800748732,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"AddMenuItems","header":1604921073,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"items","type":{"kind":"simple","type":"Array_Item","optional":false}}]},
    {"name":"DeleteMenuItems","header":4252850054,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"items","type":{"kind":"simple","type":"Array_ItemIds","optional":false}}]},
    {"name":"UpdateRestaurantDetails","header":2991301209,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"restaurantName","type":{"kind":"simple","type":"string","optional":true}},{"name":"restaurantImageUrl","type":{"kind":"simple","type":"string","optional":true}},{"name":"restaurantDescription","type":{"kind":"simple","type":"string","optional":true}},{"name":"vendorWalletAddress","type":{"kind":"simple","type":"address","optional":true}},{"name":"vendorName","type":{"kind":"simple","type":"string","optional":true}},{"name":"vendorImageUrl","type":{"kind":"simple","type":"string","optional":true}},{"name":"vendorPhoneNumber","type":{"kind":"simple","type":"string","optional":true}},{"name":"vendorLocation","type":{"kind":"simple","type":"string","optional":true}}]},
]

const TonFoodMiniApp_getters: ABIGetter[] = [
    {"name":"inQueueOrders","arguments":[{"name":"restaurantId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Array_Order","optional":false}},
    {"name":"acceptedOrders","arguments":[{"name":"restaurantId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Array_Order","optional":false}},
    {"name":"deliveredOrders","arguments":[{"name":"restaurantId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Array_Order","optional":false}},
    {"name":"cancelledOrders","arguments":[{"name":"restaurantId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Array_Order","optional":false}},
    {"name":"rejectedOrders","arguments":[{"name":"restaurantId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Array_Order","optional":false}},
    {"name":"allOrders","arguments":[{"name":"restaurantId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Array_Order","optional":false}},
    {"name":"allRestaurants","arguments":[],"returnType":{"kind":"simple","type":"Array_Restaurant","optional":false}},
]

const TonFoodMiniApp_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"CreateRestaurant"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AcceptOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DeliverOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RejectOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AddMenuItems"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DeleteMenuItems"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateRestaurantDetails"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

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
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  TonFoodMiniApp_types,
        getters: TonFoodMiniApp_getters,
        receivers: TonFoodMiniApp_receivers,
        errors: TonFoodMiniApp_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: CreateRestaurant | CreateOrder | AcceptOrder | DeliverOrder | CancelOrder | RejectOrder | AddMenuItems | DeleteMenuItems | UpdateRestaurantDetails | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateRestaurant') {
            body = beginCell().store(storeCreateRestaurant(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateOrder') {
            body = beginCell().store(storeCreateOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AcceptOrder') {
            body = beginCell().store(storeAcceptOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeliverOrder') {
            body = beginCell().store(storeDeliverOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CancelOrder') {
            body = beginCell().store(storeCancelOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RejectOrder') {
            body = beginCell().store(storeRejectOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AddMenuItems') {
            body = beginCell().store(storeAddMenuItems(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeleteMenuItems') {
            body = beginCell().store(storeDeleteMenuItems(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateRestaurantDetails') {
            body = beginCell().store(storeUpdateRestaurantDetails(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getInQueueOrders(provider: ContractProvider, restaurantId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(restaurantId);
        let source = (await provider.get('inQueueOrders', builder.build())).stack;
        const result = loadTupleArray_Order(source);
        return result;
    }
    
    async getAcceptedOrders(provider: ContractProvider, restaurantId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(restaurantId);
        let source = (await provider.get('acceptedOrders', builder.build())).stack;
        const result = loadTupleArray_Order(source);
        return result;
    }
    
    async getDeliveredOrders(provider: ContractProvider, restaurantId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(restaurantId);
        let source = (await provider.get('deliveredOrders', builder.build())).stack;
        const result = loadTupleArray_Order(source);
        return result;
    }
    
    async getCancelledOrders(provider: ContractProvider, restaurantId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(restaurantId);
        let source = (await provider.get('cancelledOrders', builder.build())).stack;
        const result = loadTupleArray_Order(source);
        return result;
    }
    
    async getRejectedOrders(provider: ContractProvider, restaurantId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(restaurantId);
        let source = (await provider.get('rejectedOrders', builder.build())).stack;
        const result = loadTupleArray_Order(source);
        return result;
    }
    
    async getAllOrders(provider: ContractProvider, restaurantId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(restaurantId);
        let source = (await provider.get('allOrders', builder.build())).stack;
        const result = loadTupleArray_Order(source);
        return result;
    }
    
    async getAllRestaurants(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('allRestaurants', builder.build())).stack;
        const result = loadTupleArray_Restaurant(source);
        return result;
    }
    
}