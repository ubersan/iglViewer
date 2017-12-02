#include <node.h>
#include <node_buffer.h>

#include "IglInvoke.hpp"

void Sum(const v8::FunctionCallbackInfo<v8::Value>& args) {
    v8::Isolate* isolate = args.GetIsolate();

    int i;
    double a = 3.1415926, b = 2.718;
    for (i = 0; i < 100000000; ++i) {
        a += b;
    }

    auto total = v8::Number::New(isolate, a);

    args.GetReturnValue().Set(total);
}

void LoadOFFFile(const v8::FunctionCallbackInfo<v8::Value>& args) {
    v8::Isolate* isolate = args.GetIsolate();

    IglInvoke* iglInvoke = new IglInvoke();

    int vRows, vCols, fRows, fCols;

    std::string filename = "C:\\Users\\Sandro\\Documents\\libigl\\tutorial\\shared\\bunny.off";
    iglInvoke->readFile(filename, vRows, vCols, fRows, fCols);

    auto vRowsReturn = v8::Number::New(isolate, vRows);

    args.GetReturnValue().Set(vRowsReturn);
}

void LoadMatrices(const v8::FunctionCallbackInfo<v8::Value>& args) {
    v8::Isolate* isolate = args.GetIsolate();

    IglInvoke* iglInvoke = new IglInvoke();

    Eigen::MatrixXd V;
    Eigen::MatrixXi F;

    std::string filename = "C:\\Users\\Sandro\\Documents\\libigl\\tutorial\\shared\\bunny.off";
    iglInvoke->readMatrices(filename, V, F);

    v8::Local<v8::Array> result_list = v8::Array::New(isolate);

    v8::Local<v8::Object> obj = v8::Object::New(isolate);
    obj->Set(0, v8::Integer::New(isolate, V.rows()));
    obj->Set(1, v8::Integer::New(isolate, F.rows()));
    obj->Set(2, v8::Integer::New(isolate, 0));
    result_list->Set(0, obj);

    for (int i = 0; i < V.rows(); ++i) {
        v8::Local<v8::Object> obj = v8::Object::New(isolate);
        obj->Set(0, v8::Number::New(isolate, V(i, 0)));
        obj->Set(1, v8::Number::New(isolate, V(i, 1)));
        obj->Set(2, v8::Number::New(isolate, V(i, 2)));
        result_list->Set(i + 1, obj);
    }

    for (int i = 0; i < F.rows(); ++i) {
        v8::Local<v8::Object> obj = v8::Object::New(isolate);
        obj->Set(0, v8::Integer::New(isolate, F(i, 0)));
        obj->Set(1, v8::Integer::New(isolate, F(i, 1)));
        obj->Set(2, v8::Integer::New(isolate, F(i, 2)));
        result_list->Set(i + 1 + V.rows(), obj);
    }

    args.GetReturnValue().Set(result_list);
}

void LoadMatricesBuffers(const v8::FunctionCallbackInfo<v8::Value>& args) {
    //double* bufferData = node::Buffer::Data(args[0]->ToObject());
}

void Initialize(v8::Local<v8::Object> exports) {
    NODE_SET_METHOD(exports, "sum", Sum);
    NODE_SET_METHOD(exports, "loadOffFile", LoadOFFFile);
    NODE_SET_METHOD(exports, "loadMatrices", LoadMatrices);
    NODE_SET_METHOD(exports, "loadMatricesBuffers", LoadMatricesBuffers);
}

NODE_MODULE(addon, Initialize)