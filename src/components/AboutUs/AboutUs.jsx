import Typography from "@material-ui/core/Typography";
import React from "react";
import { PROJECT_NAME } from "../../constants/constant";
import useStyles from "./styles";
import aboutUsImg from "../../assets/aboutUs.png";

const AboutUs = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <img src={aboutUsImg} alt="About Us" className={classes.image} />
      </div>
      <div className={classes.content}>
        <Typography variant="h4" gutterBottom>
          Welcome to Our World of Enchantment!
        </Typography>
        <Typography variant="body1" paragraph>
          At {PROJECT_NAME}, we believe in the magic of shopping—where every
          click sparks joy and every purchase ignites a sense of wonder. Our
          story is one of passion, creativity, and a relentless pursuit of
          excellence. We embarked on this journey with a vision to redefine the
          way you experience online shopping, making it an unforgettable
          adventure that leaves you mesmerized.
        </Typography>

        <Typography variant="h4" gutterBottom>
          Our Origin: A Tale of Dreams!
        </Typography>
        <Typography variant="body1" paragraph>
          It all began with a group of dreamers who shared a common desire—to
          curate a breathtaking collection of products that resonate with the
          soul. Inspired by the beauty of the world around us, we set out to
          build a platform where art, craftsmanship, and innovation intertwine
          harmoniously.
        </Typography>

        <Typography variant="h4" gutterBottom>
          Our Philosophy: Elevating Your Imagination!
        </Typography>
        <Typography variant="body1" paragraph>
          At {PROJECT_NAME}, we believe that every product is a work of art,
          carefully crafted to evoke emotions and stir imagination. Our
          passionate team scours the globe to bring you a captivating selection
          of handpicked items, each chosen with a dedication to quality,
          uniqueness, and a touch of magic.
        </Typography>

        <Typography variant="h4" gutterBottom>
          The Essence of Our Enchantment!
        </Typography>
        <Typography variant="body1" paragraph>
          <ol>
            <li>
              <i>
                <b>Unparalleled Curation</b>
              </i>
              : Our collection is a treasure trove of wonders, carefully curated
              to cater to every taste and preference. From timeless classics to
              cutting-edge creations, we ensure that each item has a story to
              tell—one that resonates with you on a personal level.
            </li>
            <li>
              <i>
                <b>Exquisite Quality</b>
              </i>
              : We take pride in offering products of the highest caliber. Every
              piece is crafted with precision and attention to detail, promising
              an unparalleled experience that delights the senses and stands the
              test of time.
            </li>
            <li>
              <i>
                <b>Customer-Centric Experience</b>
              </i>
              : You, our cherished customer, lie at the heart of our universe.
              We are committed to providing an enchanting shopping journey, with
              seamless navigation, secure transactions, and attentive customer
              support, ensuring that you feel valued and cherished every step of
              the way.
            </li>
            <li>
              <i>
                <b>Empowering Artisans</b>
              </i>
              : Beyond enchanting our customers, we strive to empower artisans
              and creators from diverse backgrounds. By promoting fair trade
              practices and sustainable sourcing, we contribute to a world where
              talent thrives and communities flourish.
            </li>
          </ol>
        </Typography>

        <Typography variant="h4" gutterBottom>
          Embark on Your Journey of Enchantment!
        </Typography>
        <Typography variant="body1" paragraph>
          Join us on this magical odyssey as we celebrate the beauty of life
          through the lens of art and innovation. Whether you seek to adorn your
          surroundings, find the perfect gift for a loved one, or simply indulge
          in the joy of discovery, {PROJECT_NAME} promises to be your beacon of
          inspiration and wonder.
        </Typography>
        <br />
        <Typography variant="body1" paragraph>
          Thank you for being a part of our story, and for allowing us to be a
          part of yours.
        </Typography>
        <br />
        <Typography variant="body1" paragraph>
          Unveil the Enchantment,
        </Typography>
        <Typography variant="body1" paragraph>
          The {PROJECT_NAME} Team
        </Typography>
      </div>
    </div>
  );
};

export default AboutUs;
