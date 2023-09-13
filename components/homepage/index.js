'use client'
import React, { useEffect, useState } from 'react'
import { PiCurrencyDollarBold } from 'react-icons/pi'
import { BsFillPersonFill } from 'react-icons/bs'
import Link from 'next/link';



export default function HomePage() {

  const [bill, setBill] = useState('');
  const [people, setPeople] = useState('');
  const [tipPercentage, setTipPercentage] = useState('')
  const [customTip, setCustomTip] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [tipAmount, setTipAmount] = useState('');
  const [isActiveButton, setIsActiveButton] = useState(false);

  useEffect(() => {
    updateButtonStatus();
  }, [bill, people, tipPercentage, customTip]);

  const handleRadioChange = (e) => {
    if (e.target.value === 'customTip' && customTip !== '') {
      // Özel ipucu içinde bir değer varsa ve "Custom" seçeneğine tıklanırsa, radyo düğmesini işlememeli
      return;
    }
    setTipPercentage(e.target.value);
    setCustomTip('');

  }
  const handleCustomChange = (e) => {
    setCustomTip(e.target.value);
    // Özel ipucu içine bir değer girdiğinizde, radyo düğmesini seçmeyi iptal etme
    setTipPercentage('')

  }


  const updateButtonStatus = () => {
    if (bill !== '' || people !== '' || (customTip !== '' || tipPercentage !== '')) {
      setIsActiveButton(true)
    } else {
      setIsActiveButton(false)
    }
  }

  const handleResetClick = () => {
    setBill('');
    setPeople('');
    setCustomTip('');
    setTipPercentage('')
    setTipAmount('$0.00');
    setTotalAmount('$0.00');
    setIsActiveButton(false)
  }

  useEffect(() => {
    const billAmount = parseFloat(bill);
    const numberOfPeople = parseFloat(people);
    const tipPercentageValue = parseFloat(tipPercentage) || parseFloat(customTip);

    if (!isNaN(billAmount) && !isNaN(numberOfPeople)) {
      if (numberOfPeople === 0) {
        setTipAmount('$0.00');
        setTotalAmount('$0.00');
      } else if (!isNaN(tipPercentageValue)) {
        const tipAmountValue = (billAmount * (tipPercentageValue / 100)) / numberOfPeople;
        const totalAmountValue = (billAmount + tipAmountValue) / numberOfPeople;
        setTipAmount(`$${tipAmountValue.toFixed(2)}`);
        setTotalAmount(`$${totalAmountValue.toFixed(2)}`);
      } else {
        setTipAmount('$0.00');
        setTotalAmount('$0.00');
      }
    } else {
      setTipAmount('$0.00');
      setTotalAmount('$0.00');
    }
  }, [bill, people, tipPercentage, customTip])





  return (
    <div className='bg-light-grayish-cyan w-full lg:min-h-screen  flex justify-center items-center flex-col relative'>
      <div className='max-w-[1440px] min-w-[374px] mx-auto h-full pt-[40px] pb-[50px]'>
        <h1 className='text-center mb-[85px] text-2xl leading-8 text-dark-cyan font-bold'>
          SPLI <br />TTER
        </h1>
        <div className='bg-white rounded-lg px-[30px] pt-[35px] pb-[30px] h-full  flex flex-col gap-[25px]  lg:px-[30px] lg:py-[30px]  lg:flex-row lg:h-full '>
          <div className='left  flex flex-col gap-[40px] max-w-[377px] w-[324px] lg:w-[374px]'>
            <div className='relative w-full'>
              <label className='block font-bold pb-1 text-dark-grayish-cyan'>Bill</label>
              <div className='relative'>
                <span className='text-grayish-cyan absolute left-[20px] top-3 text-[24px]'><PiCurrencyDollarBold /></span>
                <input
                  type="number"
                  min='1'
                  value={bill}
                  onChange={(e) => {
                    setBill(e.target.value);
                  }
                  }
                  placeholder='0'
                  className='bg-very-light-grayish-cyan outline-strong-cyan text-2xl text-dark-cyan w-full pl-[35px] font-bold  placeholder:text-[24px] h-[45px] rounded-md text-right right-0 pr-[10px]' />
              </div>
            </div>
            <div className='w-full '>
              <span className='block font-bold pb-1 text-dark-grayish-cyan'>Select Tip %</span>
              <div className='grid w-full grid-flow-rows gap-[15px] grid-cols-[repeat(auto-fill,minmax(114px,1fr))] grid-auto-rows-[minmax(45px, auto)]'>
                <label className={`input ${tipPercentage === '5' ? 'bg-strong-cyan' : ''}`}>5%
                  <input
                    type="radio"
                    className='hidden'
                    value="5"
                    onChange={handleRadioChange}
                    name="tipPercentage"
                    checked={tipPercentage === '5'}
                  />
                </label>
                <label className={`input ${tipPercentage === '10' ? 'bg-strong-cyan' : ''}`}> 10%
                  <input
                    type="radio"
                    className='hidden'
                    value="10"
                    onChange={handleRadioChange}
                    name="tipPercentage"
                    checked={tipPercentage === '10'}
                  />
                </label>
                <label className={`input ${tipPercentage === '15' ? 'bg-strong-cyan' : ''}`}>15%
                  <input
                    type="radio"
                    className='hidden'
                    value="15"
                    onChange={handleRadioChange}
                    name="tipPercentage"
                    checked={tipPercentage === '15'}
                  />
                </label>
                <label className={`input ${tipPercentage === '25' ? 'bg-strong-cyan' : ''}`}>25%
                  <input
                    type="radio"
                    className='hidden'
                    value="25"
                    onChange={handleRadioChange}
                    name="tipPercentage"
                    checked={tipPercentage === '25'}
                  />
                </label>
                <label className={`input ${tipPercentage === '50' ? 'bg-strong-cyan' : ''}`}>50%
                  <input
                    type="radio"
                    className='hidden '
                    value="50"
                    onChange={handleRadioChange}
                    name="tipPercentage"
                    checked={tipPercentage === '50'} />

                </label>
                <input
                  type="number"
                  value={customTip}
                  onChange={handleCustomChange}
                  placeholder='Custom'
                  className='h-[45px] text-2xl rounded-md outline-strong-cyan text-dark-cyan placeholder:font-bold placeholder:text-center bg-very-light-grayish-cyan font-bold placeholder:text-[20px] text-right px-[10px]' />
              </div>
            </div>
            <div className='relative w-full'>
              <div className='flex font-bold pb-1  justify-between'>
                <label className='text-dark-grayish-cyan'>Number of Poople</label>
                {
                  people === '0' ? (<label className='text-red-500'>Can't be zero</label>) : null
                }
              </div>
              <div className='relative'>
                <span className='text-grayish-cyan absolute left-[20px] top-3 text-[24px]'><BsFillPersonFill /></span>
                <input
                  type="number"
                  min='1'
                  value={people}
                  onChange={(e) => {
                    setPeople(e.target.value)
                  }}
                  placeholder='0'
                  className={`bg-very-light-grayish-cyan  text-2xl text-dark-cyan w-full pl-[35px] font-bold  placeholder:text-[24px] h-[45px] rounded-md text-right right-0 pr-[10px]
                   ${people === '0' ? 'outline-red-500' : 'outline-strong-cyan'}`} />
              </div>
            </div>
          </div>
          <div className='right bg-dark-cyan max-w-[417px] w-[324px] lg:w-[417px] rounded-md px-[25px] pt-[35px] pb-[20px] flex flex-col gap-[25px] justify-between'>
            <div className='gap-[25px] flex flex-col'>
              <div className='flex justify-between'>
                <div>
                  <h3 className='text-very-light-grayish-cyan font-bold'>Tip Amount</h3>
                  <span className='text-grayish-cyan'>/person</span>
                </div>
                <div className='text-4xl font-bold text-strong-cyan'>{tipAmount}</div>
              </div>
              <div className='flex justify-between'>
                <div>
                  <h3 className='text-very-light-grayish-cyan font-bold' >Total</h3>
                  <span className='text-grayish-cyan'>/person</span>
                </div>
                <div className='text-4xl font-bold text-strong-cyan'>{totalAmount}</div>
              </div>
            </div>
            <button
              disabled={!isActiveButton}
              className='w-full bg-strong-cyan font-bold uppercase h-[45px] rounded-md disabled:bg-dark-grayish-cyan disabled:text-dark-cyan'
              onClick={handleResetClick}
            >Reset</button>
          </div>

        </div>
      </div>
      <div className='font-bold '>
        Challenge by <Link href="https://www.frontendmentor.io/challenges" target="_blank" className='underline'>Frontend Mentor</Link>. Coded by <Link href="https://github.com/firdess" target="_blank" className='underline'>Firdes Oya</Link>.
      </div>
    </div>
  )
}
