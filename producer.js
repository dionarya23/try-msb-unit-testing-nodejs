const amqp = require('amqplib');

amqp.connect('amqp://localhost')
     .then(conn => {
        return conn.createChannel().then(ch => {
            const q = 'hello' //nama antrian
            const message = 'Hello 123456' //Isi Pesan yang dikirin ke RabbbitMQ

            const ok = ch.assertQueue(q, { 
                durable: false
            }) // Membuat antrian 'hello'

            return ok.then(() => {
                ch.sendToQueue(q, Buffer.from(message)) // mengirim pesan ke RabbitMQ
                console.log(' - Sent', message)
                return ch.close()
            })

        }).finally(() => conn.close())
     }).catch(console.warn)