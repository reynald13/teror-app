import React from 'react';
import {
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  WhatsappIcon,
  EmailIcon
} from 'react-share';

const ShareButtons = ({ resultImage }) => {
  // URL yang ingin Anda bagikan
  const shareUrl = 'https://google.com';
  // Judul yang ingin Anda bagikan
  const title = 'Judul yang ingin Anda bagikan';

  return (
    <div>
      {/* Tombol untuk berbagi ke Facebook */}
      <FacebookIcon size={32} round={true} url={shareUrl} quote={title} hashtag="#TerorLambung" />

      {/* Tombol untuk berbagi ke Twitter */}
      <TwitterIcon size={32} round={true} url={shareUrl} title={title} hashtags={['TerorLambung']} />

      {/* Tombol untuk berbagi ke Pinterest */}
      <PinterestIcon size={32} round={true} url={shareUrl} media={resultImage} />

      {/* Tombol untuk berbagi ke Whatsapp */}
      <WhatsappIcon size={32} round={true} url={shareUrl} title={title} />

      {/* Tombol untuk berbagi melalui Email */}
      <EmailIcon size={32} round={true} onClick={() => {
        // Logika untuk berbagi melalui Email
        // Misalnya, arahkan pengguna ke formulir pengiriman email
        window.location.href = `mailto:?subject=${title}&body=${shareUrl}`;
      }} />
    </div>
  );
};

export default ShareButtons;
