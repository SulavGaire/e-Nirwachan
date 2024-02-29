import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Fingerprint } from 'lucide-react';
import { useEffect, useState } from 'react';
import { string } from 'zod';

function FingrePrint({ uses }) {
    const [data, setData] = useState<string>("First Connect and Start Scanning");
    const [command, setCommand] = useState(uses);
    const [id, setID] = useState<any>();
    const [idFound, setIDFound] = useState<string>("");
    const [stored, setStored] = useState<string>("");
    const [port, setPort] = useState<SerialPort | null>(null);
    const [reader, setReader] = useState<any>(null);
    const [writer, setWriter] = useState<any>(null);
    const [readableStreamClosed, setReadableStreamClosed] = useState<any>(null);


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
        let chunkedData = "";

        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    // reader.cancel() has been called.
                    reader.releaseLock();
                    break;
                }
                if (value.includes('\n')) {
                    if (chunkedData.includes('Found ID #')) {
                        setIDFound(chunkedData);
                        const string = idFound;
                        const regex = /#(\d+)/;
                        const match = string.match(regex);

                        if (match && match[1]) {
                            const numberAfterHash = parseInt(match[1]);
                            console.log(numberAfterHash);
                            setID(numberAfterHash);
                        } else {
                            console.log("No number after # found.");
                        }
                    }
                    if (chunkedData.includes('Stored!')) {
                        setStored(chunkedData);
                    }
                    setData(chunkedData);
                    chunkedData = "";
                }
                chunkedData = chunkedData + value;
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

    async function writeToSerialPort(command) {
        const textEncoder = new TextEncoderStream();
        const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
        reader ? reader.cancel() : null;
        readableStreamClosed ? await readableStreamClosed.catch(() => { /* Ignore the error */ }) : null;
        const writer = textEncoder.writable.getWriter();
        setWriter(writer);
        await writer.write(command);
        writer.close();
        await writableStreamClosed;
        readFromSerialPort();
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
            <Button className="m-5" onClick={closeSerialPort}>Disconnect</Button>
            {/* <Button className="m-5" onClick={readFromSerialPort}>Read</Button> */}
            {uses === 'Voting' ? null : <Input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
            />}

            <Button className="m-5" onClick={() => writeToSerialPort(command)}>{uses === 'Voting' ? 'Start Scanning' : 'Write/Scanning'}</Button>
            <div className='flex flex-col justify-center items-center gap-5 mt-5'>
                <div className='flex flex-row gap-x-5'>
                    <Fingerprint
                        height={100}
                        width={100}
                    />
                    {idFound ? <p className='text-lg bg-slate-300 rounded-lg p-8'>{id}</p> : null}
                    {stored ? <p className='text-lg bg-slate-300 rounded-lg p-8'>{stored + " to " + command}</p> : null}

                </div>
                <p className='text-base items-center'>{data}</p>
            </div>

            {/* <button onClick={() => writeToSerialPort('Hello, Serial!')}>Write to Serial Port</button> */}
        </div>
    );
}

export default FingrePrint