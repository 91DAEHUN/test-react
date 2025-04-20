import { useRef, useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function CustomDateInput() {
  const [date, setDate] = useState<Date | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<any>(null); // Calendar 인스턴스 접근용

  // 정규식 유효성 검사
  const isValidDateFormat = (val: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    console.log(regex);
    if (!regex.test(val)) return false;
    const [year, month, day] = val.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value.replace(/\D/g, ''); // 숫자만

    // 자동 하이픈 삽입
    if (value.length > 4) value = value.slice(0, 4) + '-' + value.slice(4);
    if (value.length > 7) value = value.slice(0, 7) + '-' + value.slice(7);
    if (value.length > 10) value = value.slice(0, 10); // 최대 10자리

    e.currentTarget.value = value;
    console.log(value)

    // 유효한 날짜면 상태 업데이트
    if (isValidDateFormat(value)) {
      setDate(new Date(value));
    } else {
      setDate(null);
    }
  };

  const handleWrapperClick = () => {
    // 래퍼 클릭 시 input 강제 포커스
    inputRef.current?.focus();
    calendarRef.current?.overlayVisible || calendarRef.current?.show();
  };

  useEffect(() => {
    console.log("test!!!")
    const inputEl = inputRef?.current as HTMLInputElement;
    if (!inputEl) return;

    const handleKeyDown = (e: KeyboardEvent) => {
        console.log(e.key)
        if (e.key === 'Enter') {
            // 👉 캘린더 팝업 닫기
            calendarRef.current?.hide();
        }
    };

    inputEl.addEventListener('keydown', handleKeyDown);

    return () => {
        inputEl.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="w-64" onClick={handleWrapperClick}>
      <Calendar
        ref={calendarRef}
        value={date}
        onChange={(e) => setDate(e.value as Date)}
        dateFormat="yy-mm-dd"
        showIcon
        placeholder="YYYY-MM-DD"
        inputRef={inputRef}
        inputMode="numeric"
        className="w-full"
        inputClassName="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        onInput={handleInput}
      />
    </div>
  );
}