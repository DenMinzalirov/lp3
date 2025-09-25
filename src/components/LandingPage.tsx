import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { initAppAndGetActiveDomain,
  RegisterPlayer, 
  getLinkToNavigate, 
  LoginType, 
  type ActiveDomainData,
  type RegisterFormData , 
} from 'apuesta-cloud-landing-utils'

interface FormData {
  email: string;
  password: string;
  language: string;
}

const getApuestaLanguage = (): 'tr' | 'de' | 'en' => {
  const locale = typeof navigator !== 'undefined' ? (navigator.language || '').toLowerCase() : ''
  if (locale.startsWith('tr')) return 'tr'
  if (locale.startsWith('de')) return 'de'
  return 'en'
}

const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [domainData, setDomainData] = useState<ActiveDomainData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      language: 'de',
    }
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Инициализация домена при загрузке
    const initializeDomain = async () => {
      const initStartTime = new Date().toISOString()
      
      try {
        setIsLoading(true)
        // Замените на ваши реальные параметры от Apuesta.cloud
        const response = await initAppAndGetActiveDomain(
          'https://htzbtz.cc', // redirectorOrigin https://hrtzbtz.cc/ https://htzbtz.cc/
          '686a47af' // redirectorCampaignId
        )
        
        const initEndTime = new Date().toISOString()
        const initDuration = new Date(initEndTime).getTime() - new Date(initStartTime).getTime()
        
        setDomainData(response)
      } catch (err) {
        const errorTime = new Date().toISOString()
        const errorDuration = new Date(errorTime).getTime() - new Date(initStartTime).getTime()
        
        setError(err instanceof Error ? err.message : 'Ошибка инициализации домена')
      } finally {
        setIsLoading(false)
      }
    }

    initializeDomain()
  }, [])

  const onSubmit = async (data: FormData) => {
    if (!domainData) {
      setError('Error initializing domain')
      return
    }

    try {
      setError(null)

      const registerData: RegisterFormData = {
        email: data.email,
        phone: null,
        password: data.password,
        currency: 'EUR',
        language: 'de',
        promoCode: '',
        loginType: LoginType.Email,
        region: 'de',
      }

      setIsLoading(true);

      const response = await RegisterPlayer(domainData.domain, registerData)

      const linkToNavigate = getLinkToNavigate({
        activeDomainData: domainData,
        refreshToken: response.refresh_token
      })

      // alert('Регистрация успешна!');
      if (linkToNavigate) {
        // Сохраняем флаг регистрации
        localStorage.setItem('was-registered', 'true')
        
        // Перенаправляем на сайт казино в новом окне
        // window.open(linkToNavigate, '_blank', 'noopener,noreferrer')
        window.location.href = linkToNavigate
      } else {
        alert('Registration successful')
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration error')
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loaderWrapper">
        <img src="../assets/gift.png" alt="Loading" />
      </div>
    );
  }

  return (
    <div className="body">
      {/* Intro Section */}
      <section className="intro">
        <div className="content">
          <div className="wrapper">
            <h1 className="title">Willkommenspaket</h1>
            <p className="text">Bis zu 1.500 €<br />+ 250 Freispiele + Cashback bis zu 25 %</p>
            <div className="buttonWrapper">
              <button 
                className="button" 
                onClick={() => setIsModalOpen(true)}
              >
                Jetzt registrieren
              </button>
            </div>
            <p className="subtext">Dauert nur 1 Minute</p>
          </div>
        </div>
        <div className="chickens">
          <img className="left" src="../assets/chicken_l.png" alt="Huhn" />
          <img className="right" src="../assets/chicken_r.png" alt="Huhn" />
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps">
        <div className="wrapper">
          <div className="content">
            <div className="step">
              <div className="num">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAABICAMAAACk9tfMAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAGlQTFRFAAAA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ButdgAAACN0Uk5TAFD/Ac4vvwPTaIAMQA/wMCwW8Zg8V5NdYFRqSnRHWWSBH6B20ZfDAAAAjUlEQVR4nO3QSwuCUBQE4BlEwl7aY1kY/f//pCjuhAoLykQqqE1yHd2f2c7HOede4hsSjvwKj60ivnMI3M14MmGtSPCQU4K+fQNvmfW7Tzu9K7LgVZHwqW8RIaJGkRXPimxOctH278Xvj+Zt3sKrlg38S1R3z90X2GVxjnV5yBAnx9SIESNGjBgxMp68AK6eixz91WPIAAAAAElFTkSuQmCC" alt="Nummer" />
              </div>
              <div className="text">
                <h4>Registrieren</h4>
                <p>Erstelle dein Konto in nur wenigen Klicks!</p>
              </div>
            </div>
            <div className="step">
              <div className="num">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAABICAMAAAC6P+d/AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAsRQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////JmmGNgAAAOx0Uk5TADZyr+r/63E1MZzx9q0trPCApugoEaKlQxsuuU3p940XJDdAPSfbL30UkrRnKcT1VYhsQseufHke87iH7b4qMuRhOfJSVggslHYV3Q3j/T7ANKHnDE697qdIjJa/O23PI+Bfu0masY+B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" alt="Nummer" />
              </div>
              <div className="text">
                <h4>Einzahlen</h4>
                <p>Wähle aus einer Vielzahl sicherer, gebührenfreier Zahlungsmethoden.</p>
              </div>
            </div>
            <div className="step">
              <div className="num">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAABICAMAAAC6P+d/AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAuhQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////LuDs6gAAAPh0Uk5TAEuAsd3/5tS8fjQmk/DrmSpHuNqrhYeftBClqVUTGlqk9THl8YISCW7050ZN9hGRytzBlWQhGK9xYVAljL1EV4to6DDM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" alt="Nummer" />
              </div>
              <div className="text">
                <h4>Spielen</h4>
                <p>Genieße unsere riesige Auswahl an Slots oder besuche das Live-Casino!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payments Section */}
      <section className="payments">
        <div className="wrapper">
          <div className="content">
            <img src="../assets/Visa.svg" alt="Visa" />
            <img src="../assets/MasterCard.svg" alt="MasterCard" />
            <img src="../assets/ApplePay.svg" alt="ApplePay" />
            <img src="../assets/GooglePay.svg" alt="GooglePay" />
            <img src="../assets/Crypto.svg" alt="Krypto" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="wrapper">
          <div className="content">
            <div className="icons">
              <img src="../assets/default_ssl-logo.svg" alt="SSL" />
              <img src="../assets/default_18plus-logo.svg" alt="18+" />
            </div>
            <a className="link" href="/terms" target="_blank">Bonusbedingungen</a>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal active">
          <div className="wrapper">
            <div className="content">
              <div className="top">
                <div className="empty"></div>
                <h2>Registrieren</h2>
                <div className="buttonClose">
                  <button className="close" onClick={() => setIsModalOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="bottom">
                <div className="gift">
                  <div className="icon">
                    <img src="../assets/gift.png" alt="Geschenk" />
                  </div>
                  <div className="text">
                    <p>Willkommenspaket</p>
                    <h4>bis zu 1.500 € + 150 Freispiele</h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="group">
                    <label htmlFor="email">
                      <div className="input">
                        <img src="../assets/mail.png" alt="E-Mail" />
                        <input
                          {...register('email', {
                            required: 'Darf nicht leer sein',
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: 'Geben Sie eine korrekte E-Mail-Adresse ein'
                            }
                          })}
                          type="email"
                          placeholder="E-Mail eingeben"
                        />
                      </div>
                    </label>
                    {errors.email && (
                      <p className="error show">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="group">
                    <label htmlFor="password">
                      <div className="input">
                        <img src="../assets/lock.png" alt="Passwort" />
                        <input
                          {...register('password', {
                            required: 'Darf nicht leer sein',
                            minLength: {
                              value: 6,
                              message: 'Passwort muss mindestens 6 Zeichen haben'
                            }
                          })}
                          type="password"
                          placeholder="Passwort eingeben"
                        />
                      </div>
                    </label>
                    {errors.password && (
                      <p className="error show">{errors.password.message}</p>
                    )}
                  </div>
                  <div className="buttonWrapper">
                    <button 
                      className="button" 
                      type="submit" 
                      disabled={!isValid}
                    >
                      Registrieren
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
