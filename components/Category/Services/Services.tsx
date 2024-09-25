import ConsultancyCategory from "./ConsultancyCategory";
import DesignWebCategory from "./DesignWebCategory";
import DryCleaningCategory from "./DryCleaningCategory";
import GardningCategory from "./GardningCategory";
import NannyCategory from "./NannyCategory";

export default function Services() {
    return (
        <div className="pt-5">
            <h1 className='text-2xl font-bold'>All Services</h1>
            <DesignWebCategory />
            <DryCleaningCategory />
            <NannyCategory />
            <ConsultancyCategory />
            <GardningCategory />
        </div>
    )
}
