import { Request, Response } from "express";
const accountSid = "AC37fd21a9067ea806c64944d8ba1ef763";
const authToken = "5870cd336b3a5eba21e873581c3f73ff";
const verifySid = "VA9eb3b70e46c27c58e70a291059f9f578";
import twilio from "twilio";
const client = twilio(accountSid, authToken);

export const gerarCodigo = async (req: Request, res: Response) => {
  try {
    const { numero } = req.body;
    const verification = await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: "+5517988125521", channel: "sms" });
    console.log(numero)
    res.status(200).json({ message: "Código enviado com sucesso.", verification});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao gerar o código." });
  }
};

export const confirmarCodigo = async (req: Request, res: Response) => {
  try {
    const { otpCode, numero } = req.body;

    const verification_check = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: "+5517988125521", code: otpCode });


    if(verification_check.status == "approved"){
        client.messages
            .create({
              
                    body: 'pedido aprovado e esta sendo preparado para entrega',
                    messagingServiceSid: 'MG53f33c77f92b45d91012720b078c6af9',
                    to: "+5517988125521"
                })
            .then(message => console.log(message.sid))
    }else{
        client.messages
            .create({
                    body: 'pedido desaprovado',
                    messagingServiceSid: 'MG53f33c77f92b45d91012720b078c6af9',
                    to: "+5517988125521"
                })
            .then(message => console.log(message.sid))
    }

    res.status(200).json({ status: verification_check.status , verification_check});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao confirmar o código." });
  }
};
