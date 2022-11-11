const {Client} = require("@notionhq/client")

const notion = new Client({
    auth: "secret_rOrdnCbpXbCikiBFWpIASsAvnq7z4McpJ1YLqdiwa0n"
})

const updateKey = async(id, value) => {
    await notion.pages.update({
        page_id : id,
        properties: {
            title: {"key" : value}
        }
})}


;(async() => {
    const res = await notion.databases.query({
        database_id: "cf7e3db1809a4066bb42a892bddd8a61",
        filter: {
            property: "key",
            title: {
                is_not_empty: true
            }
        }
    })

    console.log(res)
})()

async function updateDatabase(databaseId, key, name, token) {
    try {
        const response = await notion.pages.update({
            page_id: {
                database_id: databaseId,
            },
            properties: {
                'key': {
                    type: 'title',
                    title: [
                    {
                        type: 'text',
                        text: {
                            content: key,
                        },
                    },
                    ],
                },
                'name' : {
                        type: 'rich_text',
                        rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: name,
                            },
                        }
                        ],
                },
                'token': {
                    type: 'number',
                    number: [
                        {
                            type: 'number',
                            text: {
                                content: token,
                            },
                        }
                    ]
                }
            }    
        });
        console.log(response);
    } catch (error) {
        console.error(error.body);
    }
}

function deleteItem(databaseId, key) {
    try {
        queryDatabase(databaseId, key)
            .then(async pageId => {

                const response = await notion.blocks.delete({
                    block_id: pageId,
                });
                console.log(response);

            })
    } catch (error) {
        console.log(error.body);
    }
}