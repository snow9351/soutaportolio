import { STATUS_STRIP_HEIGHT_PX } from "@/config/layout"

const Resume = () => {
    return (
        <iframe
            className="w-full"
            style={{ height: `calc(100% - ${STATUS_STRIP_HEIGHT_PX}px)` }}
            src="./files/soutahoshino.pdf"
            title="Souta Hoshino Resume"
            frameBorder="0"
        ></iframe>
    )
}

export default Resume
