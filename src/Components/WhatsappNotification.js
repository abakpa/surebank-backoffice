// require('dotenv').config()
import axios from 'axios'

async function sendTemplateMessage(amount,balance,direction){
    // console.log('333',amount,balance)
  
    const response = await axios({
        url:'https://graph.facebook.com/v22.0/588785547646955/messages',
        method:'post',
        headers:{
            // 'Authorization':`Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Authorization':`Bearer EAAXVpiAU07ABO5fyz39SlQghZAZCnVZCZCLrMfZAPV7ygIicRz7Qrd86gUtpFTiBBWK2Yj8YUm5qUcZB1FMIy7a27WSxJ42myuWw9Xntf1zVZBEwnVzm41hHdmOvSx4XSy4dOejDb5hOZBSxrtPtw1jX76BZCZBZByd6YZAZAfLJbbPut5RADFz38DAbx1h259DKPckFtRgZDZD`,
            'Content-Type':'application/json'
        },
        data: JSON.stringify({
            messaging_product:'whatsapp',
            to:'2348165891422',
            type: 'template',
            template:{
                name: 'sure_bank',
                language:{
                    code: 'en_US'
                },
                components:[
                    {
                        type: 'body',
                        parameters:[
                            {
                                type:'text',
                                text:direction
                            },
                            {
                                type:'text',
                                text:amount
                            },
                            {
                                type:'text',
                                text:balance
                            }
                        ]
                    }
                ]
            }
        })
    })

    console.log(response.data)
}
async function sendTextMessage(){
    const response = await axios({
        url:'https://graph.facebook.com/v22.0/588785547646955/messages',
        method:'post',
        headers:{
            'Authorization':`Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type':'application/json'
        },
        data: JSON.stringify({
            messaging_product:'whatsapp',
            to:'2348165891422',
            type: 'text',
            text:{
             body: 'This is a text message'
            }
        })
    })

    console.log(response.data)
}
// sendTextMessage()
export{sendTemplateMessage,sendTextMessage};
;