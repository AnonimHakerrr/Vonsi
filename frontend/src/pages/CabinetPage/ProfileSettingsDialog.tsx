
import React, { type ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/Dialog";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { Save } from "lucide-react";
import { APP_CONFIG } from "../../env";
import type { IProfileSettingsDialogProps } from "./types";


export const ProfileSettingsDialog: React.FC<IProfileSettingsDialogProps> =
  ({
    settingsModalOpen,
    setSettingsModalOpen,
    editableUserData,
    setEditableUserData,
    fieldErrors,
    setFieldErrors,
    setPhotoFile,
    handleSettingsChange,
    handleSaveSettings,
    user,
  }) => {
    return (
      <Dialog open={settingsModalOpen} onOpenChange={setSettingsModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Налаштування профілю</DialogTitle>
            <DialogDescription>
              Редагуйте дані вашого профілю.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 flex flex-col">
            {/* Аватарка */}
            <div className="flex items-center justify-center gap-4">
              <img
                src={
                  editableUserData.photoUrl?.startsWith("data:")
                    ? editableUserData.photoUrl
                    : APP_CONFIG.API_URL + editableUserData.photoUrl
                }
                alt={user?.firstName}
                className="w-16 h-16 rounded-full object-cover border-3 border-yellow-400"
              />
              <label className="text-sm cursor-pointer px-2 py-1 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500">
                Змінити аватар
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setPhotoFile(file);

                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setEditableUserData((prev) => ({
                        ...prev,
                        photoUrl: reader.result as string,
                      }));
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </label>
            </div>

            {/* Поля редагування профілю */}
            <div>
              <Label>Прізвище</Label>
              <Input
                value={editableUserData.lastName}
                className={fieldErrors.lastName ? "border-red-500" : ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ'-]*$/.test(value)) {
                    handleSettingsChange("lastName", value);
                    setFieldErrors((prev) => ({
                      ...prev,
                      lastName: value.length === 0,
                    }));
                  }
                }}
              />
            </div>

            <div>
              <Label>Ім’я</Label>
              <Input
                value={editableUserData.firstName}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ'-]*$/.test(value)) {
                    handleSettingsChange("firstName", value);
                    setFieldErrors((prev) => ({
                      ...prev,
                      firstName: value.length === 0,
                    }));
                  }
                }}
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                value={editableUserData.email}
                onChange={(e) => {
                  const value = e.target.value;
                  handleSettingsChange("email", value);
                  const emailValid =
                    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
                      value
                    );
                  setFieldErrors((prev) => ({ ...prev, email: !emailValid }));
                }}
              />
            </div>

            <div>
              <Label>Телефон</Label>
              <Input
                value={editableUserData.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  handleSettingsChange("phone", value);
                  const phoneValid = /^\+38\d{10}$/.test(value);
                  setFieldErrors((prev) => ({ ...prev, phone: !phoneValid }));
                }}
              />
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleSaveSettings}
                disabled={Object.values(fieldErrors).some((error) => error)}
                className={`!flex !items-center !justify-center px-2 py-1 bg-yellow-400 text-black !rounded-lg hover:bg-yellow-500 !w-50 ${
                  Object.values(fieldErrors).some((error) => error)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <Save className="h-5 w-5" /> Зберегти
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
