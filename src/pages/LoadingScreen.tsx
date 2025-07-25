import '../styles/LoadingScreen.css'
import {Ellipsis} from "lucide-react";

function LoadingScreen() {
    return (
        <div className="loading-container">
            <img
                className="loading-img"
                src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTJsY2t1bnQyMnB5ZGFrdGFlenlodDEyczAyOWc1Z213bXUzYXc3MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zkMri4yiJ3Mdy/giphy.gif"
                alt="Pokemon loading animation"
            />
            <div className="loading-text-container">
                <div className="loading-text">Loading</div>
                <div className="loading-icon">
                    <Ellipsis size={32} className="animated-ellipsis"/>
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen