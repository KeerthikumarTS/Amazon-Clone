export  default function Footer (){
    let date = new Date().getFullYear();
    return (
        <footer className="py-1">
            <p className="text-center text-dark mt-1">
                SnapKart&copy;{date}, All Rights Reserved.
            </p>
        </footer>
    )
}