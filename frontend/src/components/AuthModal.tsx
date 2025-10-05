import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { Checkbox } from "../components/CheckBox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/Dialog";
import { Eye, EyeOff } from "lucide-react";
import http_api from "../services/http_api";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
}

export function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    agreeToTerms: false,
  });

  const isFormValid =
    formData.firstName.length >= 3 &&
    formData.lastName.length >= 3 &&
    /^\+38\d{10}$/.test(formData.phone) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.password.length > 0 &&
    formData.confirmPassword === formData.password &&
    formData.agreeToTerms;

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        const res = await http_api.post("/api/Auth/login", {
          email: formData.email,
          password: formData.password,
        });

        const { token, user } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        window.location.reload();
        onClose();
      } else if (mode === "register") {
        const res = await http_api.post("/api/Auth/register", {
          phone: formData.phone,
          password: formData.password,
          passwordConfirm: formData.confirmPassword,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });

        const { token, user } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        window.location.reload();
        onClose();
      }
    } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any) {
      console.error(err);
      if (
        err.isAuthError ||
        err.response?.status === 401 ||
        err.response?.status === 403
      ) {
        setErrorMessage("Невірно введена пошта або пароль");
        setIsErrorModalOpen(true);
      } else {
        setErrorMessage("Сталася помилка. Спробуйте ще раз.");
        setIsErrorModalOpen(true);
      }
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-white !rounded-xl shadow-lg text-black max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 !text-yellow-400"
                width="1024"
                height="1024"
                viewBox="0 0 1024 1024"
              >
                <g fill="currentColor" stroke="none">
                  <path d="M 690 825 L 690 833 L 691 834 L 691 836 L 706 836 L 707 837 L 707 884 L 708 885 L 720 885 L 720 837 L 721 836 L 737 836 L 737 825 Z" />
                  <path d="M 617 825 L 617 884 L 629 884 L 630 883 L 630 865 L 631 864 L 638 864 L 642 869 L 643 872 L 645 874 L 646 877 L 651 884 L 665 884 L 665 882 L 653 865 L 653 862 L 661 855 L 662 851 L 663 850 L 663 839 L 662 838 L 661 834 L 656 829 L 652 827 L 650 827 L 649 826 L 645 826 L 644 825 Z" />
                  <path d="M 630 837 L 631 836 L 643 836 L 644 837 L 646 837 L 650 841 L 650 848 L 646 852 L 645 852 L 644 853 L 640 853 L 639 854 L 631 854 L 630 853 Z" />
                  <path d="M 380 825 L 380 884 L 423 884 L 423 873 L 393 873 L 392 872 L 392 861 L 393 860 L 419 860 L 419 849 L 394 849 L 393 848 L 393 837 L 394 836 L 421 836 L 421 829 L 422 828 L 422 825 Z" />
                  <path d="M 300 825 L 300 884 L 301 885 L 313 885 L 313 865 L 314 864 L 321 864 L 327 872 L 328 875 L 330 877 L 334 884 L 348 884 L 348 882 L 336 865 L 336 862 L 340 860 L 345 855 L 347 851 L 347 839 L 346 838 L 345 834 L 340 829 L 336 827 L 333 827 L 332 826 L 327 826 L 326 825 Z" />
                  <path d="M 313 837 L 314 836 L 326 836 L 327 837 L 330 837 L 334 841 L 334 847 L 333 848 L 333 849 L 330 852 L 329 852 L 328 853 L 314 853 L 313 852 Z" />
                  <path d="M 548 824 L 547 825 L 544 825 L 543 826 L 536 829 L 528 837 L 528 838 L 525 842 L 525 844 L 524 845 L 524 848 L 523 849 L 523 861 L 524 862 L 524 865 L 525 866 L 527 871 L 529 873 L 529 874 L 535 880 L 536 880 L 538 882 L 539 882 L 542 884 L 545 884 L 546 885 L 549 885 L 550 886 L 560 886 L 561 885 L 564 885 L 565 884 L 567 884 L 568 883 L 570 883 L 571 882 L 572 882 L 574 880 L 575 880 L 582 873 L 582 872 L 584 870 L 584 869 L 586 866 L 586 864 L 587 863 L 587 857 L 588 856 L 588 852 L 587 851 L 587 846 L 586 845 L 586 843 L 585 842 L 584 839 L 582 837 L 582 836 L 576 830 L 575 830 L 573 828 L 572 828 L 569 826 L 567 826 L 566 825 L 563 825 L 562 824 Z" />
                  <path d="M 552 835 L 560 835 L 561 836 L 563 836 L 565 838 L 566 838 L 571 843 L 571 844 L 572 845 L 572 846 L 573 847 L 573 848 L 574 849 L 574 860 L 573 861 L 573 863 L 572 864 L 572 865 L 570 867 L 570 868 L 567 871 L 566 871 L 564 873 L 563 873 L 562 874 L 559 874 L 558 875 L 552 875 L 551 874 L 549 874 L 548 873 L 547 873 L 546 872 L 545 872 L 539 866 L 539 865 L 538 864 L 538 863 L 537 862 L 537 859 L 536 858 L 536 851 L 537 850 L 537 848 L 538 847 L 538 846 L 539 845 L 539 844 L 545 838 L 546 838 L 547 837 L 548 837 L 549 836 L 551 836 Z" />
                  <path d="M 469 824 L 468 825 L 465 825 L 461 827 L 455 833 L 453 838 L 453 846 L 456 852 L 460 855 L 480 862 L 483 866 L 483 870 L 479 874 L 477 874 L 476 875 L 471 875 L 470 874 L 467 874 L 458 869 L 455 869 L 451 874 L 451 877 L 455 881 L 464 885 L 468 885 L 469 886 L 480 886 L 481 885 L 486 884 L 493 878 L 496 872 L 496 863 L 495 862 L 495 860 L 492 856 L 483 851 L 481 851 L 478 849 L 470 847 L 466 843 L 466 840 L 472 835 L 479 835 L 485 838 L 489 838 L 494 832 L 494 830 L 492 828 L 482 824 Z" />
                  <path d="M 777 642 L 776 646 L 778 648 L 781 648 L 787 651 L 790 654 L 792 659 L 792 761 L 786 769 L 775 772 L 774 776 L 775 777 L 838 777 L 839 776 L 838 772 L 827 769 L 822 764 L 820 757 L 821 657 L 826 650 L 836 647 L 837 643 L 836 642 Z" />
                  <path d="M 186 642 L 185 646 L 193 649 L 204 663 L 251 778 L 268 779 L 315 666 L 321 655 L 326 650 L 333 648 L 335 643 L 290 643 L 291 648 L 298 648 L 302 651 L 302 659 L 271 744 L 268 745 L 234 659 L 235 651 L 240 648 L 246 648 L 246 642 Z" />
                  <path d="M 640 642 L 593 642 L 594 647 L 604 650 L 610 658 L 609 731 L 604 728 L 533 642 L 495 642 L 495 647 L 505 651 L 511 659 L 511 760 L 505 768 L 495 771 L 494 776 L 543 776 L 542 772 L 532 769 L 525 760 L 525 681 L 528 680 L 609 779 L 624 779 L 624 658 L 630 650 L 640 647 Z" />
                  <path d="M 701 639 L 682 644 L 669 654 L 662 668 L 662 688 L 668 700 L 675 707 L 717 729 L 726 738 L 728 743 L 727 757 L 718 767 L 712 769 L 695 769 L 685 765 L 674 755 L 666 737 L 658 737 L 662 770 L 665 773 L 685 779 L 710 780 L 730 775 L 746 763 L 753 749 L 754 732 L 750 720 L 741 710 L 698 687 L 691 680 L 688 672 L 689 660 L 695 652 L 701 649 L 716 649 L 731 659 L 740 676 L 746 676 L 744 646 L 725 640 Z" />
                  <path d="M 386 642 L 377 645 L 360 655 L 350 665 L 341 681 L 336 701 L 336 721 L 340 738 L 351 757 L 363 768 L 376 775 L 394 780 L 420 780 L 433 777 L 454 766 L 466 754 L 475 739 L 480 720 L 480 699 L 476 683 L 471 672 L 464 662 L 456 654 L 440 645 L 427 641 L 414 639 L 404 639 Z" />
                  <path d="M 400 650 L 415 650 L 427 655 L 438 667 L 443 677 L 447 690 L 447 695 L 448 696 L 448 705 L 449 706 L 448 726 L 447 727 L 447 731 L 443 744 L 436 756 L 427 765 L 415 770 L 402 770 L 401 769 L 398 769 L 387 763 L 381 757 L 375 748 L 371 739 L 369 729 L 368 728 L 368 722 L 367 721 L 367 699 L 368 698 L 369 687 L 373 675 L 378 666 L 386 657 L 390 654 Z" />
                  <path d="M 206 400 L 206 405 L 212 422 L 227 450 L 245 469 L 255 477 L 278 491 L 282 491 L 290 485 L 310 477 L 329 475 L 334 480 L 339 480 L 425 454 L 425 452 L 376 428 L 348 417 L 294 400 L 253 394 L 222 395 Z" />
                  <path d="M 817 401 L 794 393 L 777 390 L 727 390 L 699 394 L 664 402 L 603 422 L 603 424 L 622 435 L 672 438 L 719 447 L 744 455 L 776 470 L 779 470 L 793 455 L 803 441 L 812 422 L 817 407 Z" />
                  <path d="M 664 584 L 662 578 L 631 584 L 625 576 L 528 563 L 509 538 L 545 490 L 539 471 L 516 447 L 513 427 L 541 406 L 558 436 L 596 454 L 558 486 L 620 453 L 616 442 L 573 419 L 562 390 L 573 371 L 557 358 L 578 367 L 582 352 L 562 333 L 546 339 L 538 360 L 504 358 L 454 389 L 453 403 L 471 426 L 455 419 L 447 431 L 451 451 L 481 443 L 485 448 L 330 492 L 321 487 L 315 497 L 327 503 L 331 496 L 457 461 L 486 483 L 441 529 L 432 527 L 428 538 L 381 526 L 371 530 L 590 593 L 331 528 L 566 598 L 638 595 Z" />
                  <path d="M 516 490 L 517 491 L 517 493 L 513 497 L 513 498 L 504 507 L 504 508 L 495 517 L 495 518 L 488 525 L 488 526 L 480 534 L 479 534 L 476 537 L 474 537 L 473 536 L 473 533 L 477 529 L 477 528 L 502 503 L 502 502 L 514 490 Z" />
                  <path d="M 208 364 L 304 372 L 362 389 L 433 418 L 440 409 L 439 389 L 457 370 L 503 346 L 532 345 L 543 327 L 565 323 L 578 329 L 591 349 L 590 366 L 574 388 L 578 394 L 660 375 L 710 370 L 760 374 L 816 387 L 645 209 L 639 207 L 615 228 L 508 126 L 501 127 L 398 235 L 355 208 Z" />
                  <path d="M 355 229 L 357 231 L 363 273 L 351 292 L 351 295 L 371 290 L 375 294 L 375 296 L 309 341 L 306 341 L 305 338 L 333 288 L 333 285 L 329 286 L 277 316 L 275 316 L 274 313 L 353 229 Z" />
                  <path d="M 638 228 L 640 228 L 641 229 L 641 231 L 642 232 L 642 234 L 643 235 L 643 237 L 644 238 L 644 240 L 646 244 L 646 247 L 647 248 L 647 250 L 648 251 L 648 253 L 650 257 L 650 260 L 651 261 L 651 263 L 652 264 L 652 266 L 653 267 L 653 269 L 654 270 L 654 272 L 655 273 L 655 275 L 657 279 L 657 282 L 658 283 L 658 285 L 659 286 L 659 288 L 660 289 L 660 291 L 661 292 L 661 294 L 662 295 L 662 297 L 663 298 L 663 300 L 665 304 L 665 307 L 666 308 L 666 310 L 667 311 L 667 313 L 669 317 L 669 320 L 668 321 L 666 321 L 621 277 L 617 277 L 616 276 L 609 276 L 608 275 L 602 275 L 601 274 L 597 274 L 596 273 L 596 271 L 607 259 L 607 258 L 633 232 L 634 232 Z" />
                  <path d="M 505 145 L 508 152 L 516 197 L 503 225 L 501 246 L 519 231 L 523 230 L 551 296 L 548 297 L 530 284 L 527 284 L 495 309 L 491 310 L 490 307 L 501 285 L 497 285 L 465 298 L 441 305 L 441 298 L 460 251 L 431 276 L 428 276 L 411 246 L 499 149 Z" />
                </g>
              </svg>
              <span className="text-xl font-bold">VONSI RESORT</span>
            </div>
            <DialogTitle className="text-center">
              {mode === "login" ? "Вхід в акаунт" : "Реєстрація"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ім'я</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => {
                        const value = e.target.value;

                        // Валідація: тільки літери, мінімум 2 символи
                        const regex = /^[a-zA-Zа-яА-ЯіїєґІЇЄҐ'-]{0,}$/;

                        if (regex.test(value)) {
                          handleInputChange("firstName", value);
                        }
                      }}
                      required
                      className="bg-white text-black"
                    />
                    {formData.firstName.length > 0 &&
                      formData.firstName.length < 3 && (
                        <p className="text-red-500 text-xs mt-1">
                          Ім’я повинно містити мінімум 3 літери
                        </p>
                      )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Прізвище</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => {
                        const value = e.target.value;

                        // Валідація: тільки літери, апостроф, дефіс
                        const regex = /^[a-zA-Zа-яА-ЯіїєґІЇЄҐ'-]{0,}$/;

                        if (regex.test(value)) {
                          handleInputChange("lastName", value);
                        }
                      }}
                      required
                      className="bg-white text-black"
                    />
                    {formData.lastName.length > 0 &&
                      formData.lastName.length < 3 && (
                        <p className="text-red-500 text-xs mt-1">
                          Прізвище повинно містити мінімум 3 літери
                        </p>
                      )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+380 (67) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => {
                      let value = e.target.value;

                      // Якщо користувач стирає +38, додаємо його назад
                      if (!value.startsWith("+38")) {
                        value = "+38" + value.replace(/^\+?38?/, "");
                      }

                      // Дозволяємо тільки цифри після +38 та максимум 9 цифр
                      const digits = value.slice(3); // відокремлюємо цифри після +38
                      if (/^\d*$/.test(digits) && digits.length <= 10) {
                        handleInputChange("phone", value);
                      }
                    }}
                    required
                    className="bg-white text-black"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="bg-white text-black"
              />
              {formData.email &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                  <p className="text-red-500 text-sm mt-1">
                    Невірний формат email
                  </p>
                )}
            </div>

            {/* Пароль */}
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <div className="relative w-full">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  required
                  className="pr-10 bg-white text-black"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {mode === "register" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Підтвердити пароль</Label>
                  <div className="relative w-full">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      required
                      className="pr-10 bg-white text-black"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword &&
                    formData.confirmPassword !== formData.password && (
                      <p className="text-red-500 text-sm mt-1">
                        Паролі не співпадають
                      </p>
                    )}
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Checkbox
                    className="rounded-1 border border-black bg-yellow-400 text-black checked:bg-yellow-400  checked:!border-yellow-400  checked:!text-black"
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      handleInputChange("agreeToTerms", checked as boolean)
                    }
                  />
                  <Label htmlFor="terms" className="text-xs">
                    Я погоджуюся з{" "}
                    <a
                      href="/terms"
                      className="!text-yellow-600 !hover:underline"
                    >
                      умовами використання
                    </a>{" "}
                    та{" "}
                    <a
                      href="/privacy"
                      className="!text-yellow-600 !hover:underline"
                    >
                      політикою конфіденційності
                    </a>
                  </Label>
                </div>
              </>
            )}

            <Button
              type="submit"
              className="!w-50 !rounded-lg !mx-auto bg-yellow-400 text-black hover:bg-yellow-500"
              disabled={mode === "register" ? !isFormValid : false}
            >
              {mode === "login" ? "Увійти" : "Зареєструватися"}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="text-yellow-600 hover:text-yellow-700"
              >
                {mode === "login"
                  ? "Немає акаунта? Зареєструйтеся"
                  : "Вже маєте акаунт? Увійдіть"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isErrorModalOpen}
        onOpenChange={() => setIsErrorModalOpen(false)}
      >
        <DialogContent className="sm:max-w-[300px] bg-white !rounded-xl shadow-lg text-black text-center">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-15 w-15 text-yellow-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.372 0 0 5.372 0 12c0 6.628 5.372 12 12 12s12-5.372 12-12C24 5.372 18.628 0 12 0zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <span className="font-bold text-xl">{errorMessage}</span>
            </DialogTitle>
          </DialogHeader>
          <Button
            onClick={() => setIsErrorModalOpen(false)}
            className="bg-yellow-400 text-black hover:bg-yellow-500 !mx-auto !w-1/2 rounded-2"
          >
            Закрити
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
