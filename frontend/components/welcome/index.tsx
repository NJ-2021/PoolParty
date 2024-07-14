import { DynamicWidget } from "@dynamic-labs/sdk-react-core";



export function Welcome() {
    return <div className="relative">
        <div
            className="relative z-10 flex flex-col justify-center items-center space-y-4 bg-cover bg-no-repeat bg-center p-8 rounded-lg w-full"
            style={{
                backgroundImage: `linear-gradient(90deg, rgba(2,0,36,0.7833727240896359) 0%, rgba(2,0,36,0.3744091386554622) 51%, rgba(2,0,36,0.7917760854341737) 100%), url('/bg.png')`,
            }}
        >
            <div className="flex flex-col items-center space-y-2 [text-shadow:_0_2px_2px_rgb(0_0_0_/_40%)] text-3xl text-center">
                <span>Welcome to Pool Party</span>
            </div>
            <div className="text-xl">Uniswap v4 pools optimizer</div>
            <DynamicWidget />
        </div>
    </div >
}