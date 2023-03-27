import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
*/

const mongoConnection = {
    isConnected: 0
}

export const connect = async() => {

    if ( mongoConnection.isConnected ) {
        console.log('Ya estabamos conectados... ');
        console.log('Aer que sale en la variable mongooConnection.isConnected ', mongoConnection.isConnected );
        return;
    }

    if ( mongoose.connections.length > 0 ) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;

        if ( mongoConnection.isConnected === 1 ) {
            console.log('Usando conexión anterior');
            return;            
        }

        await mongoose.disconnect()
    }
    
    await mongoose.connect( process.env.MONGO_URL || '' );
    mongoConnection.isConnected= 1;
    console.log('Aki si Conectado a MongoDB: ', mongoConnection.isConnected);
}

export const disconnect = async() => {

    if ( process.env.NODE_ENV === 'development' ) return;

    if ( mongoConnection.isConnected === 0 ) return;

    
    await mongoose.disconnect();
    mongoConnection.isConnected = 0;
    console.log('Desconcectado de MongoDB')
}
