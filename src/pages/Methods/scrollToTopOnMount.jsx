import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTopOnMount() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 10000);
	}, [pathname]);
    
    
	return null;
}