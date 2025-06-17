import { PageProps } from "$fresh/server.ts";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";

export default function Layout({ Component }: PageProps) {
    return (
        <div class="page-wrapper">
            <Header/>
            <main class="main-content"><Component /></main>
            <Footer />
        </div>
    );
}