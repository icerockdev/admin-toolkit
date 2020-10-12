var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
export var generateBaseData = function (items) {
    return __spreadArrays(new Array(items)).map(function (_, id) { return ({
        id: id,
        name: "Person " + (id + 1),
        age: Math.random() * 80,
        role: 10,
        status: 20,
        birthDate: new Date().toISOString(),
        description: 'Lorem Ipsum and etc',
    }); });
};
