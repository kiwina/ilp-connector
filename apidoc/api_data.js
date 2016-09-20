define({ "api": [
  {
    "type": "get",
    "url": "/pairs",
    "title": "Get currency pairs",
    "name": "GetPairs",
    "group": "Currency_Pairs",
    "description": "<p>Get the currency pairs for which this connector can provide quotes and facilitate payments.</p>",
    "success": {
      "examples": [
        {
          "title": "Get Currency Pairs",
          "content": "HTTP/1.1 200 OK\n  [\n    {\n      \"source_asset\": \"USD\",\n      \"source_ledger\": \"https://usd-ledger.example/USD\",\n      \"destination_asset\": \"EUR\",\n      \"destination_ledger\": \"https://eur-ledger.example/EUR\"\n    },\n    {\n      \"source_asset\": \"EUR\",\n      \"source_ledger\": \"https://eur-ledger.example/EUR\",\n      \"destination_asset\": \"USD\",\n      \"destination_ledger\": \"https://usd-ledger.example/USD\"\n    },\n    {\n      \"source_asset\": \"JPY\",\n      \"source_ledger\": \"https://jpy-ledger.example/JPY\",\n      \"destination_asset\": \"USD\",\n      \"destination_ledger\": \"https://usd-ledger.example/USD\"\n    }]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/pairs.js",
    "groupTitle": "Currency_Pairs"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Get the server metadata",
    "name": "GetMetadata",
    "group": "Metadata",
    "version": "1.0.0",
    "description": "<p>This endpoint will return server metadata.</p>",
    "filename": "src/controllers/metadata.js",
    "groupTitle": "Metadata"
  },
  {
    "type": "get",
    "url": "/quote",
    "title": "Get quote",
    "name": "Quote",
    "group": "Quote",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "URI",
            "optional": false,
            "field": "source_address",
            "description": "<p>Account where the transfer crediting the connector's account will take place</p>"
          },
          {
            "group": "Parameter",
            "type": "URI",
            "optional": false,
            "field": "destination_address",
            "description": "<p>Account where the transfer debiting the connector's account will take place</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "source_amount",
            "defaultValue": "(Set by connector if destination_amount is￿   specified)",
            "description": "<p>Fixed amount to be debited from sender's account (should not be specified if destination_amount is)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "destination_amount",
            "defaultValue": "(Set by connector if source_amount is￿   specified)",
            "description": "<p>Fixed amount to be credited to receiver's account (should not be specified if source_amount is)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "destination_expiry_duration",
            "defaultValue": "(Maximum allowed if￿   unspecified)",
            "description": "<p>Number of milliseconds between when the source transfer is proposed and when it expires</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "source_expiry_duration",
            "defaultValue": "(Minimum allowed based on￿   destination_expiry_duration)",
            "description": "<p>Number of milliseconds between when the destination transfer is proposed and when it expires</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "slippage",
            "description": "<p>Use a slippage other than the connector's default</p>"
          }
        ]
      }
    },
    "description": "<p>Get a quote from the connector based on either a fixed source or fixed destination amount.</p>",
    "examples": [
      {
        "title": "Fixed Source Amount:",
        "content": "curl https://connector.example? \\\n  source_amount=100.25 \\\n  &source_address=eur-ledger.alice \\\n  &destination_address=usd-ledger.bob \\\n  &source_expiry_duration=6 \\\n  &destination_expiry_duration=5 \\",
        "type": "shell"
      },
      {
        "title": "Fixed Destination Amount:",
        "content": "curl https://connector.example? \\\n  destination_amount=105.71 \\\n  &source_address=eur-ledger.alice \\\n  &destination_address=usd-ledger.bob \\\n  &source_expiry_duration=6000 \\\n  &destination_expiry_duration=5000 \\",
        "type": "shell"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 Quote Response:",
          "content": "HTTP/1.1 200 OK\n  {\n    \"source_connector_account\": \"mark\",\n    \"source_ledger\": \"eur-ledger\",\n    \"source_amount\": \"100.25\",\n    \"source_expiry_duration\": \"6000\",\n    \"destination_ledger\": \"usd-ledger\",\n    \"destination_amount\": \"105.71\",\n    \"destination_expiry_duration\": \"5000\"\n  }",
          "type": "json"
        },
        {
          "title": "200 Quote Response:",
          "content": "HTTP/1.1 200 OK\n  {\n    \"source_connector_account\": \"mark\",\n    \"source_ledger\": \"eur-ledger\",\n    \"source_amount\": \"100.25\",\n    \"source_expiry_duration\": \"6000\",\n    \"destination_ledger\": \"usd-ledger\",\n    \"destination_amount\": \"105.71\",\n    \"destination_expiry_duration\": \"5000\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/quote.js",
    "groupTitle": "Quote",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnacceptableExpiryError",
            "description": "<p>Insufficient time between the destination and source expiry duration to ensure transfers can be executed in time.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AssetsNotTradedError",
            "description": "<p>The connector does not facilitate payments between the given currency pair.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UnacceptableExpiryError",
          "content": "HTTP/1.1 422 Bad Request\n{\n  \"id\": \"UnacceptableExpiryError\",\n  \"message\": \"The difference between the destination expiry duration and the source expiry duration is insufficient to ensure that we can execute the source transfers.\"\n}",
          "type": "json"
        },
        {
          "title": "AssetsNotTradedError",
          "content": "HTTP/1.1 422 Bad Request\n{\n  \"id\": \"AssetsNotTradedError\",\n  \"message\": \"Error description here.\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
