import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseImgURL, options } from '../constant';
import millify from 'millify';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import ReactPlayer from 'react-player';

const DetailPage = () => {
  const [movie, setMovie] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits%2Cvideos&language=tr`,
        options
      )
      .then((res) => setMovie(res.data));
  }, []);

  return (
    <div className="row">
      {!movie ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <>
          <div className="col-12 banner">
            <img
              className="w-100 h-100 object-fit-cover"
              src={baseImgURL + movie.backdrop_path}
              alt=""
            />
            <div className="banner-bg">
              <span>{movie.title}</span>
            </div>
          </div>
          <div className="col-md-6 mt-4 p-4">
            <h3>Yapımcı Şirketler</h3>

            <div className="d-flex flex-wrap gap-4">
              {movie.production_companies.map((i) => (
                <div className="bg-white rounded p-2 d-flex align-items-center">
                  {i.logo_path ? (
                    <img
                      className="object-fit-contain"
                      width={100}
                      height={50}
                      src={baseImgURL + i.logo_path}
                    />
                  ) : (
                    <span className="company">{i.name}</span>
                  )}
                </div>
              ))}
            </div>

            <h3 className="mt-4">Konuşulan Diller</h3>

            <div className="d-flex flex-wrap gap-4">
              {movie.spoken_languages.map((i) => (
                <div className="bg-white rounded p-2 d-flex align-items-center">
                  <span className="company">{i.name}</span>
                </div>
              ))}
            </div>

            <h3 className="mt-4">Yapımcı Ülkeler</h3>

            <div className="d-flex flex-wrap gap-4">
              {movie.production_countries.map((i) => (
                <div className="bg-white rounded p-2 d-flex align-items-center">
                  <span className="company">{i.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6 mt-4 p-4">
            <p className="lead">{movie.overview}</p>

            <p className="fs-5">
              <span className="fw-bold">Bütçe : </span>
              <span className="text-success">
                {movie.budget === 0 ? 'Bilinmiyor' : millify(movie.budget)} $
              </span>
            </p>
            <p className="fs-5">
              <span className="fw-bold">Gelir : </span>
              <span className="text-success">
                {movie.revenue === 0 ? 'Bilinmiyor' : millify(movie.revenue)} $
              </span>
            </p>
          </div>
          <div className="col-12 p-4 my-3">
            <h2>Oyuncular</h2>
            <Splide
              options={{
                height: '200px',
                gap: '10px',
                pagination: false,
                autoWidth: true,
              }}
            >
              {movie.credits.cast.map((i) => (
                <SplideSlide>
                  <div className="actor-card h-100">
                    <img
                      className="movie"
                      src={
                        i.profile_path
                          ? baseImgURL + i.profile_path
                          : '/default-actor.jpg'
                      }
                    />
                    <p>
                      <span>{i.character}</span>
                      <span>{i.name}</span>
                    </p>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </div>
          <div className='my-5 p-4'>
            <h1>Videolar</h1>
            <Splide>
              {movie.videos.results.map((video) => (
                <SplideSlide >
                  <div className="d-flex justify-content-center my-2 w-100">
                    <ReactPlayer width='100%' height='500px'
                      url={`https://www.youtube.com/watch?v=${video.key}`}
                    />
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;
