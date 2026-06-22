module.exports = [
"[project]/src/messages/en.json.[json].cjs [app-rsc] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/src_messages_en_json_[json]_cjs_1qq3x3_._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/messages/en.json.[json].cjs [app-rsc] (ecmascript)");
    });
});
}),
"[project]/src/messages/ru.json.[json].cjs [app-rsc] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/src_messages_ru_json_[json]_cjs_13ig78d._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/messages/ru.json.[json].cjs [app-rsc] (ecmascript)");
    });
});
}),
];