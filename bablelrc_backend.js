{
    "presets": [
            "@babel/preset-env",
            "@babel/preset-react"
    ],
    "plugins": [
        [
            "import",
            {
                "libraryName": "antd",
                "style": true
            }
        ],
        "@babel/plugin-proposal-class-properties"
    ]
}