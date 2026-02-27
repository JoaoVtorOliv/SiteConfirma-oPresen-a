import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIRMATION_DEADLINE } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Send, Check, AlertCircle, Calendar, Loader2, Plus, Trash2, Users } from 'lucide-react';
import { toast } from 'sonner';

import { collection, addDoc, serverTimestamp,doc,getDoc,setDoc } from "firebase/firestore";
import {normalizarNome} from "../../lib/nomeUtils"
import { db } from "../../services/firebase";


interface Guest {
  id: string;
  name: string;
  attending: boolean | null;
}

interface FormData {
  guests: Guest[];
}

// Generate unique ID for guests
const generateId = () => Math.random().toString(36).substring(2, 9);

// Create empty guest
const createEmptyGuest = (): Guest => ({
  id: generateId(),
  name: '',
  attending: null,
});

// Simulated database storage (replace with Firebase/Supabase)

const saveConfirmation = async (guests: Guest[]) => {
  for (const guest of guests) {
    const nomeNormalizado = normalizarNome(guest.name);

    const ref = doc(db, "convidados", nomeNormalizado);

    await setDoc(
      ref,
      {
        nome: guest.name,
        nomeNormalizado,
        confirmou: guest.attending,
        acompanhantes: 0,
        createdAt: serverTimestamp(),
      },
      { merge: true } // 🔥 ESSENCIAL
    );
  }
};
const RSVPForm = () => {
  const [formData, setFormData] = useState<FormData>({
    guests: [createEmptyGuest()],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);

  useEffect(() => {
    // Check if deadline has passed
    const checkDeadline = () => {
      setIsDeadlinePassed(new Date() > CONFIRMATION_DEADLINE);
    };
    
    checkDeadline();
    const interval = setInterval(checkDeadline, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  const formatDeadline = () => {
    return CONFIRMATION_DEADLINE.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const addGuest = () => {
    if (formData.guests.length >= 10) {
      toast.error('Limite máximo de 10 convidados por envio.');
      return;
    }
    setFormData(prev => ({
      guests: [...prev.guests, createEmptyGuest()],
    }));
  };

  const removeGuest = (id: string) => {
    if (formData.guests.length <= 1) {
      toast.error('É necessário pelo menos um convidado.');
      return;
    }
    setFormData(prev => ({
      guests: prev.guests.filter(guest => guest.id !== id),
    }));
  };

  const updateGuest = (id: string, field: keyof Guest, value: string | boolean | null) => {
    setFormData(prev => ({
      guests: prev.guests.map(guest =>
        guest.id === id ? { ...guest, [field]: value } : guest
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const invalidGuests = formData.guests.filter(
      guest => !guest.name.trim() || guest.name.trim().length > 100
    );
    
    if (invalidGuests.length > 0) {
      toast.error('Por favor, informe o nome de todos os convidados (máx. 100 caracteres).');
      return;
    }

    const unconfirmedGuests = formData.guests.filter(guest => guest.attending === null);
    if (unconfirmedGuests.length > 0) {
      toast.error('Por favor, confirme a presença de todos os convidados.');
      return;
    }

    if (isDeadlinePassed) {
      toast.error('O prazo para confirmação foi encerrado.');
      return;
    }

    setIsSubmitting(true);

    try {
      await saveConfirmation(formData.guests);
      setIsSubmitted(true);
      
      const attendingCount = formData.guests.filter(g => g.attending).length;
      const totalCount = formData.guests.length;
      
      if (attendingCount === totalCount) {
        toast.success(`${totalCount > 1 ? 'Presenças confirmadas' : 'Presença confirmada'}! Nos vemos lá! 💕`);
      } else if (attendingCount === 0) {
        toast.success('Respostas registradas. Sentiremos a falta de vocês!');
      } else {
        toast.success(`${attendingCount} de ${totalCount} confirmados! 💕`);
      }
      
      // Reset form
      setFormData({ guests: [createEmptyGuest()] });
    } catch (error) {
      toast.error('Erro ao enviar. Por favor, tente novamente.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Deadline passed state
  if (isDeadlinePassed) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto"
      >
        <div className="wedding-card p-8 md:p-10 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="wedding-title text-2xl md:text-3xl mb-4">
            Prazo Encerrado
          </h3>
          <p className="text-muted-foreground font-body text-lg">
            O prazo para confirmação de presença foi encerrado em{' '}
            <span className="text-foreground font-semibold">{formatDeadline()}</span>.
          </p>
          <p className="mt-4 text-muted-foreground font-body">
            Em caso de dúvidas, entre em contato diretamente com os noivos.
          </p>
        </div>
      </motion.section>
    );
  }

  // Success state
  if (isSubmitted) {
    return (
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto"
      >
        <div className="wedding-card p-8 md:p-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <Check className="w-10 h-10 text-primary" />
          </motion.div>
          <h3 className="wedding-title text-2xl md:text-3xl mb-4 gold-gradient-text">
            Obrigado!
          </h3>
          <p className="text-muted-foreground font-body text-lg mb-6">
            Suas respostas foram registradas com sucesso.
          </p>
          <Button
            variant="outline"
            onClick={() => setIsSubmitted(false)}
            className="font-body"
          >
            Enviar outra confirmação
          </Button>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="max-w-2xl mx-auto"
    >
      {/* Deadline Notice */}
      <div className="flex items-center justify-center gap-2 text-primary mb-6">
        <Calendar className="w-4 h-4" />
        <span className="wedding-subtitle tracking-[0.15em]">
          Confirme até {formatDeadline()}
        </span>
      </div>

      {/* Form Card */}
      <div className="wedding-card p-6 md:p-10">
        <h2 className="wedding-title text-2xl md:text-3xl text-center mb-2">
          Confirme sua Presença
        </h2>
        <p className="text-center text-muted-foreground font-body mb-8">
          Adicione todos os membros da família ou casal
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Guests List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="font-body text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Convidados ({formData.guests.length})
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addGuest}
                disabled={isSubmitting || formData.guests.length >= 10}
                className="font-body text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
            </div>

            <AnimatePresence mode="popLayout">
              {formData.guests.map((guest, index) => (
                <motion.div
                  key={guest.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 rounded-lg border border-border/60 bg-background/50 space-y-4">
                    {/* Guest Header */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground font-body">
                        Convidado {index + 1}
                      </span>
                      {formData.guests.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeGuest(guest.id)}
                          disabled={isSubmitting}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor={`name-${guest.id}`} className="font-body text-sm">
                        Nome Completo <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id={`name-${guest.id}`}
                        type="text"
                        placeholder="Digite o nome completo"
                        value={guest.name}
                        onChange={(e) => updateGuest(guest.id, 'name', e.target.value)}
                        disabled={isSubmitting}
                        maxLength={100}
                        className="font-body text-base py-5 bg-card border-border/60 focus:border-primary focus:ring-primary"
                      />
                    </div>

                    {/* Attendance Field */}
                    <div className="space-y-2">
                      <Label className="font-body text-sm">
                        Irá comparecer? <span className="text-primary">*</span>
                      </Label>
                      <RadioGroup
                        value={guest.attending === null ? '' : guest.attending ? 'yes' : 'no'}
                        onValueChange={(value) =>
                          updateGuest(guest.id, 'attending', value === 'yes')
                        }
                        disabled={isSubmitting}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2 p-3 rounded-lg border border-border/60 bg-card hover:bg-primary/5 hover:border-primary/30 transition-colors cursor-pointer flex-1">
                          <RadioGroupItem value="yes" id={`yes-${guest.id}`} className="text-primary" />
                          <Label htmlFor={`yes-${guest.id}`} className="font-body text-sm cursor-pointer flex-1">
                            Sim 🎉
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg border border-border/60 bg-card hover:bg-muted hover:border-muted-foreground/30 transition-colors cursor-pointer flex-1">
                          <RadioGroupItem value="no" id={`no-${guest.id}`} />
                          <Label htmlFor={`no-${guest.id}`} className="font-body text-sm cursor-pointer flex-1">
                            Não 😢
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Add More Button (Mobile friendly) */}
          {formData.guests.length < 10 && (
            <Button
              type="button"
              variant="ghost"
              onClick={addGuest}
              disabled={isSubmitting}
              className="w-full font-body text-muted-foreground hover:text-primary border border-dashed border-border/60 hover:border-primary/30"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar mais um convidado
            </Button>
          )}

          {/* Submit Button */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isSubmitting ? 'loading' : 'idle'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 text-lg font-body bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Confirmar {formData.guests.length > 1 ? `${formData.guests.length} Presenças` : 'Presença'}
                  </>
                )}
              </Button>
            </motion.div>
          </AnimatePresence>
        </form>
      </div>
    </motion.section>
  );
};

export default RSVPForm;
