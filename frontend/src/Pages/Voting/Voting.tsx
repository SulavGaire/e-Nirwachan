import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

function Voting() {
    const [data, setData] = useState<string>("this data should chainge");
    const [command, setCommand] = useState<string>("");
    const [port, setPort] = useState<SerialPort | null>(null);
    const [reader, setReader] = useState<ReadableStreamDefaultReader<string> | null>(null);
    const [writer, setWriter] = useState<WritableStreamDefaultWriter<string> | null>(null);
    const [readableStreamClosed, setReadableStreamClosed] = useState<ReadableStreamDefaultReader<string> | null>(null);

    async function connectToSerialPort() {
        const filters = [
            { usbVendorId: 0x2341, usbProductId: 0x0043 },
            { usbVendorId: 0x2341, usbProductId: 0x0001 }
        ];

        // Prompt user to select any serial port.
        const port = await navigator.serial.requestPort({ filters });
        setPort(port);
        // Wait for the serial port to open.
        let open = await port.open({ baudRate: 9600 });
        console.log("[Port Available :]", port);
    }

    async function readFromSerialPort() {
        const textDecoder = new TextDecoderStream();
        const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
        setReadableStreamClosed(readableStreamClosed);
        const reader = textDecoder.readable.getReader();
        setReader(reader);
        // Listen to data coming from the serial device.

        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    // reader.cancel() has been called.
                    reader.releaseLock();
                    break;
                }
                setData(value);
                console.log(value);
            }
        } catch (error) {
            // Handle error...
            console.log("[Error :]", error);
        } finally {
            // Allow the serial port to be closed later.
            reader.releaseLock();
        }
    }

    async function writeToSerialPort(command: string) {
        const textEncoder = new TextEncoderStream();
        const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
        reader ? reader.cancel() : null;
        readableStreamClosed ? await readableStreamClosed.catch(() => { /* Ignore the error */ }) : null;
        const writer = textEncoder.writable.getWriter();
        setWriter(writer);
        await writer.write(command);
        writer.close();
        await writableStreamClosed;

        console.log("command recived :", command);
    }

    async function closeSerialPort() {
        reader ? reader.cancel() : null;
        reader ? reader.releaseLock() : null;
        readableStreamClosed ? await readableStreamClosed.catch(() => { /* Ignore the error */ }) : null;
        await port.close();
        setPort(null);
        console.log('[Port Closed :]', port);
    }

    return (
        <div>
            <Button className="m-5" onClick={connectToSerialPort}>Connect</Button>
            <Button className="m-5" onClick={closeSerialPort}>Close</Button>
            <Button className="m-5" onClick={readFromSerialPort}>Read</Button>

            <Input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
            />
            <Button className="m-5" onClick={() => writeToSerialPort(command)}>Write</Button>

            {data}
            {/* <button onClick={() => writeToSerialPort('Hello, Serial!')}>Write to Serial Port</button> */}
        </div>
    );
}

export default Voting;
