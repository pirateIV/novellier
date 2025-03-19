import React from "react";
import HeroImage from "@/components/home-page/hero-image";
import TopReviews from "@/components/home-page/top-reviews";
import HeaderContent from "@/components/home-page/header-content";
import Footer from "@/shared/components/footer";
import Link from "next/link";

const HomePage = () => {
  const isAuthenticated = true;

  return (
    <div className="min-h-full flex flex-col">
      <nav className="fixed w-full inset-x-0 top-0 backdrop-blur  supports-[backdrop-filter]:bg-transparent z-20">
        <ul className="py-5 flex items-center justify-end gap-8 pe-8">
          <li>
            <Link href="/genres" className="text-sm font-medium">
              Genres
            </Link>
          </li>
          <li>
            <Link href="/me" className="text-sm font-medium">
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
      <header className="lg-bg-transparent overflow-hidden bg-slate-100 dark:bg-background lg:px-5 lg:bg-transparent">
        <div className="mx-auto max-w-6xl isolate grid grid-cols-1 gap-y-16 pt-16 lg:grid-cols-12 lg:gap-y-0 lg:py-32">
          <HeroImage />
          <TopReviews />
          <HeaderContent />
        </div>
      </header>
      <Footer />
    </div>
  );
};

export default HomePage;
