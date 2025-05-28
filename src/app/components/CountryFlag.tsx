import Image from 'next/image';
import { Country } from '../@types/country';

interface CountryFlagProps {
  country: Country;
}

const CountryFlag: React.FC<CountryFlagProps> = ({ country }) => {
  const countryName = country.name.common;

  return (
    <div
      className="
            border border-gray-200 rounded-lg p-4 text-center
            flex flex-col items-center justify-start h-64
            shadow-md hover:shadow-lg transition-transform duration-200 ease-in-out transform hover:-translate-y-1
            "
    >
      {country.flags?.svg && (
        <div className="relative w-full pb-[60%] mb-2">
          <Image
            src={country.flags.svg}
            alt={`Flag of ${countryName}`}
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      )}
      <h3 className="text-base font-medium mt-auto whitespace-nowrap overflow-hidden text-ellipsis w-full">
        {countryName}
      </h3>
    </div>
  );
};

export default CountryFlag;