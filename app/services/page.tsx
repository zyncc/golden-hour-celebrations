import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen mt-[100px] py-10 px-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-yellow-600">
          Golden Hour Celebrations
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Your one-stop destination for private theatre celebrations and
          unforgettable moments.
        </p>
      </header>
      <section className="rounded-lg shadow-lg p-6 max-w-4xl mx-auto mb-8">
        <h2 className="text-2xl font-semibold text-yellow-500">
          Why Choose Us?
        </h2>
        <p className="mt-4 text-gray-600">
          At Golden Hour Celebrations, we specialize in making your loved
          ones&#39; special day truly memorable. Whether it’s a birthday,
          anniversary, baby shower, or just a moment to celebrate, we provide
          personalized decorations and a private theatre experience exclusively
          for you.
        </p>
      </section>
      <section className="rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-yellow-500">
          Occasions We Cater To:
        </h2>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>
            🎉 <span className="font-medium">Birthdays</span>
          </li>
          <li>
            💍 <span className="font-medium">Anniversaries</span>
          </li>
          <li>
            👰 <span className="font-medium">Bride/Groom-to-Be</span>
          </li>
          <li>
            👶 <span className="font-medium">Baby Showers</span>
          </li>
          <li>
            ❤️ <span className="font-medium">Valentine&#39;s Day</span>
          </li>
          <li>
            🏆 <span className="font-medium">Celebrate Your Achievements</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
