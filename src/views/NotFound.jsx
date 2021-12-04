import pageNotFound from "../assets/img/page-not-found.png"

export default function NotFound() {
    return (
    <div className="mb-5 mt-3">
        <h2 className="text-center text-dark fw-bold">Page Not Found</h2>
        <img className="mb-5" src={pageNotFound} alt="pageNotFound" style={{width:"100%",height:"38vh"}}/>
    </div>
    )
}
