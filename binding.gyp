{
    "targets": [
        {
            "include_dirs": [
                "../../libigl/include",
                "../../eigen"
            ],
            "target_name": "IglNativeAddon",
            "sources": [
                "src/addon/IglNativeAddon.cpp",
                "src/addon/IglInvoke.cpp"
            ]
        }
    ]
}