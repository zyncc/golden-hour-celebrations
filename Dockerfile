FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

COPY prisma ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENV DATABASE_URL="mongodb+srv://Chandan:Chandan1234@cluster0.gmwqwi1.mongodb.net/Booking?retryWrites=true&w=majority&appName=Cluster0"
ENV MERCHANT_ID="M22XXCBWK4P46"
ENV SALT_KEY="ac330c32-0d1d-4752-9f46-b15d61756de3"
ENV RESEND_API_KEY="re_FjFKHxHC_DzXLYTXsgsEdXKWkHCHSxNmP"
ENV AUTH_SECRET="rU0BDkQeYC83HOEcibOAz2GPjui/1KR43qya3w2W4mk="
ENV AUTH_GOOGLE_SECRET="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"
ENV AUTH_GOOGLE_ID="636536358668-i56t1c5ql0e868bem6ebp4cer6spou8f.apps.googleusercontent.com"

CMD ["npm", "run", "start"]