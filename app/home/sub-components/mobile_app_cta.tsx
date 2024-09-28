import playstoreImg from "@/public/icons/playstore.svg"
import appstoreImg from "@/public/icons/appstore.svg"

const MobileAppCta = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl sm:text-4xl font-bold">Download Our Mobile App</h2>
      <p className="text-xl sm:text-2xl !mt-1">Available on iOS and Android</p>
      <div className="flex gap-x-5 flex-wrap">
        <a href="/">
            <img alt="" src={playstoreImg.src} />
        </a>
        <a href="/">
            <img src={appstoreImg.src} alt="" />
        </a>
      </div>
    </div>
  )
}

export default MobileAppCta
