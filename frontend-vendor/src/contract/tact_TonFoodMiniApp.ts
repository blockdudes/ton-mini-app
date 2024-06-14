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

export type Array_OrderRefs = {
    $$type: 'Array_OrderRefs';
    Map: Dictionary<number, OrderRef>;
    length: bigint;
}

export function storeArray_OrderRefs(src: Array_OrderRefs) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.Map, Dictionary.Keys.Uint(16), dictValueParserOrderRef());
        b_0.storeInt(src.length, 257);
    };
}

export function loadArray_OrderRefs(slice: Slice) {
    let sc_0 = slice;
    let _Map = Dictionary.load(Dictionary.Keys.Uint(16), dictValueParserOrderRef(), sc_0);
    let _length = sc_0.loadIntBig(257);
    return { $$type: 'Array_OrderRefs' as const, Map: _Map, length: _length };
}

function loadTupleArray_OrderRefs(source: TupleReader) {
    let _Map = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserOrderRef(), source.readCellOpt());
    let _length = source.readBigNumber();
    return { $$type: 'Array_OrderRefs' as const, Map: _Map, length: _length };
}

function storeTupleArray_OrderRefs(source: Array_OrderRefs) {
    let builder = new TupleBuilder();
    builder.writeCell(source.Map.size > 0 ? beginCell().storeDictDirect(source.Map, Dictionary.Keys.Uint(16), dictValueParserOrderRef()).endCell() : null);
    builder.writeNumber(source.length);
    return builder.build();
}

function dictValueParserArray_OrderRefs(): DictionaryValue<Array_OrderRefs> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeArray_OrderRefs(src)).endCell());
        },
        parse: (src) => {
            return loadArray_OrderRefs(src.loadRef().beginParse());
        }
    }
}

export type Restaurant = {
    $$type: 'Restaurant';
    restaurantId: Address;
    name: string;
    imageUrl: string;
    description: string;
    vendorDetails: User;
    menu: Array_MenuItem;
}

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
    return { $$type: 'Restaurant' as const, restaurantId: _restaurantId, name: _name, imageUrl: _imageUrl, description: _description, vendorDetails: _vendorDetails, menu: _menu };
}

function loadTupleRestaurant(source: TupleReader) {
    let _restaurantId = source.readAddress();
    let _name = source.readString();
    let _imageUrl = source.readString();
    let _description = source.readString();
    const _vendorDetails = loadTupleUser(source.readTuple());
    const _menu = loadTupleArray_MenuItem(source.readTuple());
    return { $$type: 'Restaurant' as const, restaurantId: _restaurantId, name: _name, imageUrl: _imageUrl, description: _description, vendorDetails: _vendorDetails, menu: _menu };
}

function storeTupleRestaurant(source: Restaurant) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.restaurantId);
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
    restaurantId: Address;
    orderId: bigint;
    items: Array_OrderItem;
    userDetails: User;
    billingDetails: BillingDetails;
    status: bigint;
    category: bigint;
    createdAt: bigint;
}

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
    return { $$type: 'Order' as const, restaurantId: _restaurantId, orderId: _orderId, items: _items, userDetails: _userDetails, billingDetails: _billingDetails, status: _status, category: _category, createdAt: _createdAt };
}

function loadTupleOrder(source: TupleReader) {
    let _restaurantId = source.readAddress();
    let _orderId = source.readBigNumber();
    const _items = loadTupleArray_OrderItem(source.readTuple());
    const _userDetails = loadTupleUser(source.readTuple());
    const _billingDetails = loadTupleBillingDetails(source.readTuple());
    let _status = source.readBigNumber();
    let _category = source.readBigNumber();
    let _createdAt = source.readBigNumber();
    return { $$type: 'Order' as const, restaurantId: _restaurantId, orderId: _orderId, items: _items, userDetails: _userDetails, billingDetails: _billingDetails, status: _status, category: _category, createdAt: _createdAt };
}

function storeTupleOrder(source: Order) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.restaurantId);
    builder.writeNumber(source.orderId);
    builder.writeTuple(storeTupleArray_OrderItem(source.items));
    builder.writeTuple(storeTupleUser(source.userDetails));
    builder.writeTuple(storeTupleBillingDetails(source.billingDetails));
    builder.writeNumber(source.status);
    builder.writeNumber(source.category);
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

export type OrderRef = {
    $$type: 'OrderRef';
    restaurantId: Address;
    orderId: bigint;
}

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
    return { $$type: 'OrderRef' as const, restaurantId: _restaurantId, orderId: _orderId };
}

function loadTupleOrderRef(source: TupleReader) {
    let _restaurantId = source.readAddress();
    let _orderId = source.readBigNumber();
    return { $$type: 'OrderRef' as const, restaurantId: _restaurantId, orderId: _orderId };
}

function storeTupleOrderRef(source: OrderRef) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.restaurantId);
    builder.writeNumber(source.orderId);
    return builder.build();
}

function dictValueParserOrderRef(): DictionaryValue<OrderRef> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOrderRef(src)).endCell());
        },
        parse: (src) => {
            return loadOrderRef(src.loadRef().beginParse());
        }
    }
}

export type CreateRestaurant = {
    $$type: 'CreateRestaurant';
    restaurantName: string;
    restaurantImageUrl: string;
    restaurantDescription: string;
    vendorDetails: User;
    menuItems: Array_Item;
}

export function storeCreateRestaurant(src: CreateRestaurant) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2405478780, 32);
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
    if (sc_0.loadUint(32) !== 2405478780) { throw Error('Invalid prefix'); }
    let _restaurantName = sc_0.loadStringRefTail();
    let _restaurantImageUrl = sc_0.loadStringRefTail();
    let _restaurantDescription = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _vendorDetails = loadUser(sc_1);
    let sc_2 = sc_1.loadRef().beginParse();
    let _menuItems = loadArray_Item(sc_2);
    return { $$type: 'CreateRestaurant' as const, restaurantName: _restaurantName, restaurantImageUrl: _restaurantImageUrl, restaurantDescription: _restaurantDescription, vendorDetails: _vendorDetails, menuItems: _menuItems };
}

function loadTupleCreateRestaurant(source: TupleReader) {
    let _restaurantName = source.readString();
    let _restaurantImageUrl = source.readString();
    let _restaurantDescription = source.readString();
    const _vendorDetails = loadTupleUser(source.readTuple());
    const _menuItems = loadTupleArray_Item(source.readTuple());
    return { $$type: 'CreateRestaurant' as const, restaurantName: _restaurantName, restaurantImageUrl: _restaurantImageUrl, restaurantDescription: _restaurantDescription, vendorDetails: _vendorDetails, menuItems: _menuItems };
}

function storeTupleCreateRestaurant(source: CreateRestaurant) {
    let builder = new TupleBuilder();
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
    restaurantId: Address;
    items: Array_OrderItem;
    userDetails: User;
    billingDetails: BillingDetails;
    category: bigint;
}

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
    if (sc_0.loadUint(32) !== 2149543816) { throw Error('Invalid prefix'); }
    let _restaurantId = sc_0.loadAddress();
    let _items = loadArray_OrderItem(sc_0);
    let sc_1 = sc_0.loadRef().beginParse();
    let _userDetails = loadUser(sc_1);
    let _billingDetails = loadBillingDetails(sc_1);
    let _category = sc_1.loadUintBig(8);
    return { $$type: 'CreateOrder' as const, restaurantId: _restaurantId, items: _items, userDetails: _userDetails, billingDetails: _billingDetails, category: _category };
}

function loadTupleCreateOrder(source: TupleReader) {
    let _restaurantId = source.readAddress();
    const _items = loadTupleArray_OrderItem(source.readTuple());
    const _userDetails = loadTupleUser(source.readTuple());
    const _billingDetails = loadTupleBillingDetails(source.readTuple());
    let _category = source.readBigNumber();
    return { $$type: 'CreateOrder' as const, restaurantId: _restaurantId, items: _items, userDetails: _userDetails, billingDetails: _billingDetails, category: _category };
}

function storeTupleCreateOrder(source: CreateOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.restaurantId);
    builder.writeTuple(storeTupleArray_OrderItem(source.items));
    builder.writeTuple(storeTupleUser(source.userDetails));
    builder.writeTuple(storeTupleBillingDetails(source.billingDetails));
    builder.writeNumber(source.category);
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
    restaurantId: Address;
    orderId: bigint;
}

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
    if (sc_0.loadUint(32) !== 466598426) { throw Error('Invalid prefix'); }
    let _restaurantId = sc_0.loadAddress();
    let _orderId = sc_0.loadUintBig(256);
    return { $$type: 'DeliverOrder' as const, restaurantId: _restaurantId, orderId: _orderId };
}

function loadTupleDeliverOrder(source: TupleReader) {
    let _restaurantId = source.readAddress();
    let _orderId = source.readBigNumber();
    return { $$type: 'DeliverOrder' as const, restaurantId: _restaurantId, orderId: _orderId };
}

function storeTupleDeliverOrder(source: DeliverOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.restaurantId);
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
    restaurantId: Address;
    orderId: bigint;
}

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
    if (sc_0.loadUint(32) !== 2977925407) { throw Error('Invalid prefix'); }
    let _restaurantId = sc_0.loadAddress();
    let _orderId = sc_0.loadUintBig(256);
    return { $$type: 'CancelOrder' as const, restaurantId: _restaurantId, orderId: _orderId };
}

function loadTupleCancelOrder(source: TupleReader) {
    let _restaurantId = source.readAddress();
    let _orderId = source.readBigNumber();
    return { $$type: 'CancelOrder' as const, restaurantId: _restaurantId, orderId: _orderId };
}

function storeTupleCancelOrder(source: CancelOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.restaurantId);
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
    restaurantId: Address;
    orderId: bigint;
}

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
    if (sc_0.loadUint(32) !== 3095951649) { throw Error('Invalid prefix'); }
    let _restaurantId = sc_0.loadAddress();
    let _orderId = sc_0.loadUintBig(256);
    return { $$type: 'AcceptOrder' as const, restaurantId: _restaurantId, orderId: _orderId };
}

function loadTupleAcceptOrder(source: TupleReader) {
    let _restaurantId = source.readAddress();
    let _orderId = source.readBigNumber();
    return { $$type: 'AcceptOrder' as const, restaurantId: _restaurantId, orderId: _orderId };
}

function storeTupleAcceptOrder(source: AcceptOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.restaurantId);
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
    restaurantId: Address;
    orderId: bigint;
}

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
    if (sc_0.loadUint(32) !== 2504964398) { throw Error('Invalid prefix'); }
    let _restaurantId = sc_0.loadAddress();
    let _orderId = sc_0.loadUintBig(256);
    return { $$type: 'RejectOrder' as const, restaurantId: _restaurantId, orderId: _orderId };
}

function loadTupleRejectOrder(source: TupleReader) {
    let _restaurantId = source.readAddress();
    let _orderId = source.readBigNumber();
    return { $$type: 'RejectOrder' as const, restaurantId: _restaurantId, orderId: _orderId };
}

function storeTupleRejectOrder(source: RejectOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.restaurantId);
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
    restaurantId: Address;
    items: Array_Item;
}

export function storeAddMenuItems(src: AddMenuItems) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(441498067, 32);
        b_0.storeAddress(src.restaurantId);
        b_0.store(storeArray_Item(src.items));
    };
}

export function loadAddMenuItems(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 441498067) { throw Error('Invalid prefix'); }
    let _restaurantId = sc_0.loadAddress();
    let _items = loadArray_Item(sc_0);
    return { $$type: 'AddMenuItems' as const, restaurantId: _restaurantId, items: _items };
}

function loadTupleAddMenuItems(source: TupleReader) {
    let _restaurantId = source.readAddress();
    const _items = loadTupleArray_Item(source.readTuple());
    return { $$type: 'AddMenuItems' as const, restaurantId: _restaurantId, items: _items };
}

function storeTupleAddMenuItems(source: AddMenuItems) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.restaurantId);
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
    restaurantId: Address;
    items: Array_ItemIds;
}

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
    if (sc_0.loadUint(32) !== 542497896) { throw Error('Invalid prefix'); }
    let _restaurantId = sc_0.loadAddress();
    let _items = loadArray_ItemIds(sc_0);
    return { $$type: 'DeleteMenuItems' as const, restaurantId: _restaurantId, items: _items };
}

function loadTupleDeleteMenuItems(source: TupleReader) {
    let _restaurantId = source.readAddress();
    const _items = loadTupleArray_ItemIds(source.readTuple());
    return { $$type: 'DeleteMenuItems' as const, restaurantId: _restaurantId, items: _items };
}

function storeTupleDeleteMenuItems(source: DeleteMenuItems) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.restaurantId);
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
    restaurantId: Address;
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
        b_0.storeUint(4168228382, 32);
        b_0.storeAddress(src.restaurantId);
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
    if (sc_0.loadUint(32) !== 4168228382) { throw Error('Invalid prefix'); }
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
    return { $$type: 'UpdateRestaurantDetails' as const, restaurantId: _restaurantId, restaurantName: _restaurantName, restaurantImageUrl: _restaurantImageUrl, restaurantDescription: _restaurantDescription, vendorWalletAddress: _vendorWalletAddress, vendorName: _vendorName, vendorImageUrl: _vendorImageUrl, vendorPhoneNumber: _vendorPhoneNumber, vendorLocation: _vendorLocation };
}

function loadTupleUpdateRestaurantDetails(source: TupleReader) {
    let _restaurantId = source.readAddress();
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
    builder.writeAddress(source.restaurantId);
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
    const __code = Cell.fromBase64('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');
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
    {"name":"Array_OrderRefs","header":null,"fields":[{"name":"Map","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"OrderRef","valueFormat":"ref"}},{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Restaurant","header":null,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"address","optional":false}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"imageUrl","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"vendorDetails","type":{"kind":"simple","type":"User","optional":false}},{"name":"menu","type":{"kind":"simple","type":"Array_MenuItem","optional":false}}]},
    {"name":"Order","header":null,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"address","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"items","type":{"kind":"simple","type":"Array_OrderItem","optional":false}},{"name":"userDetails","type":{"kind":"simple","type":"User","optional":false}},{"name":"billingDetails","type":{"kind":"simple","type":"BillingDetails","optional":false}},{"name":"status","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"category","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"createdAt","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"User","header":null,"fields":[{"name":"walletAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"phoneNumber","type":{"kind":"simple","type":"string","optional":false}},{"name":"location","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"Item","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"imageUrl","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"MenuItem","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"imageUrl","type":{"kind":"simple","type":"string","optional":false}},{"name":"isDeleted","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"OrderItem","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"quantity","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"BillingDetails","header":null,"fields":[{"name":"totalAmount","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"OrderRef","header":null,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"address","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"CreateRestaurant","header":2405478780,"fields":[{"name":"restaurantName","type":{"kind":"simple","type":"string","optional":false}},{"name":"restaurantImageUrl","type":{"kind":"simple","type":"string","optional":false}},{"name":"restaurantDescription","type":{"kind":"simple","type":"string","optional":false}},{"name":"vendorDetails","type":{"kind":"simple","type":"User","optional":false}},{"name":"menuItems","type":{"kind":"simple","type":"Array_Item","optional":false}}]},
    {"name":"CreateOrder","header":2149543816,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"address","optional":false}},{"name":"items","type":{"kind":"simple","type":"Array_OrderItem","optional":false}},{"name":"userDetails","type":{"kind":"simple","type":"User","optional":false}},{"name":"billingDetails","type":{"kind":"simple","type":"BillingDetails","optional":false}},{"name":"category","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"DeliverOrder","header":466598426,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"address","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"CancelOrder","header":2977925407,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"address","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"AcceptOrder","header":3095951649,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"address","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"RejectOrder","header":2504964398,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"address","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"AddMenuItems","header":441498067,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"address","optional":false}},{"name":"items","type":{"kind":"simple","type":"Array_Item","optional":false}}]},
    {"name":"DeleteMenuItems","header":542497896,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"address","optional":false}},{"name":"items","type":{"kind":"simple","type":"Array_ItemIds","optional":false}}]},
    {"name":"UpdateRestaurantDetails","header":4168228382,"fields":[{"name":"restaurantId","type":{"kind":"simple","type":"address","optional":false}},{"name":"restaurantName","type":{"kind":"simple","type":"string","optional":true}},{"name":"restaurantImageUrl","type":{"kind":"simple","type":"string","optional":true}},{"name":"restaurantDescription","type":{"kind":"simple","type":"string","optional":true}},{"name":"vendorWalletAddress","type":{"kind":"simple","type":"address","optional":true}},{"name":"vendorName","type":{"kind":"simple","type":"string","optional":true}},{"name":"vendorImageUrl","type":{"kind":"simple","type":"string","optional":true}},{"name":"vendorPhoneNumber","type":{"kind":"simple","type":"string","optional":true}},{"name":"vendorLocation","type":{"kind":"simple","type":"string","optional":true}}]},
]

const TonFoodMiniApp_getters: ABIGetter[] = [
    {"name":"inQueueOrders","arguments":[{"name":"restaurantId","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"Array_Order","optional":false}},
    {"name":"acceptedOrders","arguments":[{"name":"restaurantId","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"Array_Order","optional":false}},
    {"name":"deliveredOrders","arguments":[{"name":"restaurantId","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"Array_Order","optional":false}},
    {"name":"cancelledOrders","arguments":[{"name":"restaurantId","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"Array_Order","optional":false}},
    {"name":"rejectedOrders","arguments":[{"name":"restaurantId","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"Array_Order","optional":false}},
    {"name":"allOrders","arguments":[{"name":"restaurantId","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"Array_Order","optional":false}},
    {"name":"allUserOrders","arguments":[{"name":"userId","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"Array_Order","optional":false}},
    {"name":"allRestaurants","arguments":[],"returnType":{"kind":"simple","type":"Array_Restaurant","optional":false}},
    {"name":"restaurantById","arguments":[{"name":"restaurantId","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"Array_Restaurant","optional":false}},
    {"name":"isVendorPresent","arguments":[{"name":"restaurantId","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
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
    
    async getInQueueOrders(provider: ContractProvider, restaurantId: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(restaurantId);
        let source = (await provider.get('inQueueOrders', builder.build())).stack;
        const result = loadTupleArray_Order(source);
        return result;
    }
    
    async getAcceptedOrders(provider: ContractProvider, restaurantId: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(restaurantId);
        let source = (await provider.get('acceptedOrders', builder.build())).stack;
        const result = loadTupleArray_Order(source);
        return result;
    }
    
    async getDeliveredOrders(provider: ContractProvider, restaurantId: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(restaurantId);
        let source = (await provider.get('deliveredOrders', builder.build())).stack;
        const result = loadTupleArray_Order(source);
        return result;
    }
    
    async getCancelledOrders(provider: ContractProvider, restaurantId: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(restaurantId);
        let source = (await provider.get('cancelledOrders', builder.build())).stack;
        const result = loadTupleArray_Order(source);
        return result;
    }
    
    async getRejectedOrders(provider: ContractProvider, restaurantId: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(restaurantId);
        let source = (await provider.get('rejectedOrders', builder.build())).stack;
        const result = loadTupleArray_Order(source);
        return result;
    }
    
    async getAllOrders(provider: ContractProvider, restaurantId: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(restaurantId);
        let source = (await provider.get('allOrders', builder.build())).stack;
        const result = loadTupleArray_Order(source);
        return result;
    }
    
    async getAllUserOrders(provider: ContractProvider, userId: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(userId);
        let source = (await provider.get('allUserOrders', builder.build())).stack;
        const result = loadTupleArray_Order(source);
        return result;
    }
    
    async getAllRestaurants(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('allRestaurants', builder.build())).stack;
        const result = loadTupleArray_Restaurant(source);
        return result;
    }
    
    async getRestaurantById(provider: ContractProvider, restaurantId: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(restaurantId);
        let source = (await provider.get('restaurantById', builder.build())).stack;
        const result = loadTupleArray_Restaurant(source);
        return result;
    }
    
    async getIsVendorPresent(provider: ContractProvider, restaurantId: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(restaurantId);
        let source = (await provider.get('isVendorPresent', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
}