import MessageBody from "@/components/Shared/MessageBoxForAll/MessageBody";

export default function ChatPage() {
    return (
        <div className="bg-white relative overflow-hidden">
            {/* Left Image */}
            <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
            {/* Right Image */}
            <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />

            <div className="overflow-hidden mt-0 container mx-auto max-w-7xl px-6">
                <h3 className="text-lg lg:text-2xl font-bold text-black pb-5 pt-2">Messages</h3>
                <MessageBody />
            </div>
        </div>
    )
}
