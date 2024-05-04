import { useState } from "react";

// React Icons
import { LuScreenShare } from "react-icons/lu";
import { TbDeviceIpadShare } from "react-icons/tb";
import { TbDeviceMobileShare } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";
import { FaViber } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

// Share on social media
import { WhatsappShareButton, ViberShareButton, FacebookMessengerShareButton, EmailShareButton } from "react-share";

const ShareApp = () => {
    const [previewBarcode, setPreviewBarcode] = useState(false);
    const [shareApp, setShareApp] = useState(false);

    return <div className="w-[70%] mx-auto my-12 text-teal-700">
        <div className="text-center">
            <p className="font-bold text-2xl sm:text-xl">Share app with other guests!</p>
        </div>
        <div className="text-center mt-10 flex flex-col items-center">
            <p className="font-semibold text-2xl sm:text-xl">Share scanning QR-Code</p>
            <div className="border-[.4rem] border-teal-700 w-[15rem] h-[15rem] sm:w-[12rem] sm:h-[12rem] mt-4">
                
            <img onClick={()=>setPreviewBarcode(true)} className="p-1 cursor-pointer" src={require("../images/qr-code.jpg")} alt="qr-code" />
            </div>
        </div>
        <div className="text-center mt-12 flex flex-col items-center">
            <p className="font-semibold text-2xl sm:text-xl">Share using social media</p>
            <div className="text-[16rem] sm:text-[8rem] mt-4 cursor-pointer">
            <LuScreenShare onClick={()=>setShareApp(true)} className="md:hidden sm:hidden" />
            <TbDeviceIpadShare onClick={()=>setShareApp(true)} className="hidden md:block" />
            <TbDeviceMobileShare onClick={()=>setShareApp(true)} className="hidden sm:block" />
            </div>
        </div>
        {previewBarcode && <BarCodeFullPreview setPreviewBarcode={setPreviewBarcode} />}
        {shareApp && <ShareAppSocialMedia shareApp={shareApp} setShareApp={setShareApp} />}
    </div>
}

export default ShareApp;

function BarCodeFullPreview({setPreviewBarcode}) {
    return <div className="fixed top-0 left-0 bottom-0 right-0">
        <div onClick={()=>setPreviewBarcode(false)} className="bg-black cursor-pointer opacity-45 w-full h-full"></div>
        <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] sm:w-full w-[25%] md:w-[35%]">
        <img className="w-full sm:w-[75%] mx-auto" src={require("../images/qr-code.jpg")} alt="qr-code" />
        </div>
    </div>
}

function ShareAppSocialMedia({setShareApp, shareApp}) {
    return <div className="fixed top-0 left-0 bottom-0 right-0 z-50">
        <div onClick={()=>setShareApp(false)} className="bg-black cursor-pointer opacity-45 w-full h-full"></div>
        <div className={`absolute rounded-tl rounded-tr bg-green-200 left-0 right-0 ${shareApp ? "socialApp-anime-apply bottom-0" : "socialApp-anime-none"}`}>
        <RxCross2 onClick={()=>setShareApp(false)} className="absolute right-4 top-4 text-3xl" />
            <p className="text-center pt-12 font-semibold text-xl">Share app on</p>
            <SocialApps/>
        </div>
    </div>
}

function SocialApps() {
    const title = "Photo Sharing App";
    const bodyOfEmail = "Please click on the link and be a part of our family! "

    const url = "https://photos-sharing-app.vercel.app/";
   
    return <div className="flex justify-center gap-8 mt-6 mb-12 text-5xl">
        <WhatsappShareButton url={url} title={title}>
        <FaWhatsapp className="cursor-pointer" />
        </WhatsappShareButton>
        <ViberShareButton url={url} title={title}>
        <FaViber className="cursor-pointer" />
        </ViberShareButton>
        <FacebookMessengerShareButton url={url}>
        <FaFacebookMessenger className="cursor-pointer" />
        </FacebookMessengerShareButton>
        <EmailShareButton url={url} subject={title} body={bodyOfEmail}>
        <MdOutlineEmail className="cursor-pointer" />
        </EmailShareButton>
    </div>
}