const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_INTEGRATIONS", "GUILD_PRESENCES", "GUILD_VOICE_STATES", "GUILD_SCHEDULED_EVENTS"] });

// Comandi + Stato

client.on('ready', () => {
    client.user.setActivity("Land Citizens", { type: "LISTENING" }); // Online
    // client.user.setStatus("idle"); // Maintenance

    console.log(`${client.user.tag} is online`)

    client.guilds.cache.forEach(guild => {
        guild.commands.create({
            name: "donate",
            description: "Scopri come supportare finanziariamente DARK3R's Land"
        })

        guild.commands.create({
            name: "memberinfo",
            description: "Ottieni le informazioni sull'utente selezionato",
            options:
                [
                    {
                        name: "user",
                        description: "Le informazioni sull'utente da mostrare",
                        type: "USER",
                        required: true
                    }
                ]
        })

        guild.commands.create({
            name: "report",
            description: "Invia una segnalazione",
            options:
                [
                    {
                        name: "user",
                        description: "Seleziona l'utente da segnalare",
                        type: "USER",
                        required: true
                    }
                ]
        })
    })
})

// Risposta comandi

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return

    // /donate
    if (interaction.commandName == "donate") {
        var buttonDonate = new Discord.MessageButton()
            .setStyle("LINK")
            .setLabel("Donate")
            .setEmoji("<:HeartIcon:1212896841558130748>")
            .setURL("https://ko-fi.com/dark3r")

        var rowDonate = new Discord.MessageActionRow()
            .addComponents(buttonDonate)

        interaction.reply({ content: "Se sei interessato a supportare il team di DARK3R's Land, consulta la nostra pagina Ko-Fi! Puoi aiutarci direttamente a compensare finanziariamente i nostri sviluppatori, creatori di contenuti e manager per il loro duro lavoro. Grazie!\n\nNon dimenticare di collegare il tuo account Discord a Ko-Fi per ricevere un ruolo speciale come Supporter.", components: [rowDonate], ephemeral: true })
    }

    // /memberinfo
    if (interaction.commandName == "memberinfo") {
        const user = interaction.options.getUser("user");
        const member = interaction.guild.members.cache.get(user.id);
        
        var embedMemberInfo = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setAuthor({ name: `${user.username}`, iconURL: user.avatarURL({ dynamic: true }) })
            .addFields
            (
                { name: "User ID:", value: "```" + `${user.id}` + "```", inline: false },
                { name: "Achievements: ", value: "```0```", inline: false},
                { name: "Created at:", value: "```" + `- ${Math.floor((new Date() - user.createdAt) / (1000 * 60 * 60 * 24))} giorni fa \n- ${user.createdAt.toDateString()} \n- ${user.createdAt.toTimeString().split(' ')[0]} GMT` + "```", inline: true },
                { name: "Joined at:", value: "```" + `- ${Math.floor((new Date() - member.joinedAt) / (1000 * 60 * 60 * 24))} giorni fa \n- ${member.joinedAt.toDateString()} \n- ${member.joinedAt.toTimeString().split(' ')[0]} GMT` + "```", inline: true },
            )

            interaction.reply({ embeds: [embedMemberInfo] })
    }

    // /report
    if (interaction.commandName == "report") {
        const modalReport = new Discord.Modal()
            .setTitle("Submit a Report")
            .setCustomId("modalReportID")

        const object = new Discord.TextInputComponent()
            .setCustomId("objectID")
            .setLabel("Object")
            .setPlaceholder("Write text here")
            .setStyle("SHORT")
            .setRequired(true)

        const description = new Discord.TextInputComponent()
            .setCustomId("descriptionID")
            .setLabel("Description")
            .setPlaceholder("Write text here")
            .setStyle("PARAGRAPH")
            .setRequired(true)

        const rowObject = new Discord.MessageActionRow()
            .addComponents(object)

        const rowDescription = new Discord.MessageActionRow()
            .addComponents(description)

        modalReport.addComponents(rowObject, rowDescription)

        await interaction.showModal(modalReport);
    }
})

// Messaggi

client.on("messageCreate", async (message) => {
    // #rules
    if (message.content == "?rules") {
        var embedRules = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setDescription("## <:RulesIcon:1187827242152251493> Regole\nLa tua presenza qui implica l'accettazione di queste regole e di eventuali aggiornamenti futuri. Le modifiche possono avvenire senza preavviso, quindi rimani aggiornato. Mostra comprensione quando i moderatori garantiscono un ambiente pacifico.\n\n- **Rispetta Tutti:** Tratta tutti i membri allo stesso modo e con rispetto, indipendentemente dalle differenze di credo. Non intraprendere alcuna forma di molestia, bullismo o attacchi mirati nei confronti degli altri membri\n- **Family-Friendly:** Usa soprannomi e immagini del profilo rispettosi; evitare contenuti offensivi o innapropriati. Mantieni il server family-friendly evitando di pubblicare contenuti di natura sessuale.\n- **Canali Pertinenti:** Pubblica contenuti nei canali appropriati per mantenere le discussioni organizzate. Evita conversazioni fuori tema nei canali designati per argomenti specifici.\n- **Segui le Regole di Discord:** Rispetta i Termini di Servizio di Discord e le Linee Guida della Community.")

        var buttonToS = new Discord.MessageButton()
            .setStyle("LINK")
            .setLabel("Terms of Service")
            .setURL("https://discord.com/terms")

        var buttonGuidelines = new Discord.MessageButton()
            .setStyle("LINK")
            .setLabel("Community Guidelines")
            .setURL("https://discord.com/guidelines")

        var rowLinks = new Discord.MessageActionRow()
            .addComponents(buttonToS, buttonGuidelines)

        await message.delete()
        await message.channel.send({ embeds: [embedRules], components: [rowLinks] })
    }

    // #form
    if (message.content == "?form") {
        var embedMinecraftForm = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setDescription("## <:FormsIcon:1187827246367514645> Minecraft Application Form\nPer unirti al nostro server Minecraft, leggi le regole del server e completa il modulo di richiesta. Esamineremo la tua domanda entro pochi giorni e ti faremo sapere se sei stato accettato.\n\n- **Respect Builds:** Sii rispettoso delle creazioni degli altri giocatori. Evita di danneggiare intenzionalmente o di prendere le loro cose senza permesso. Mostra gentilezza rispettando il loro lavoro.\n- **Fair Play:** Gioca onestamente senza imbrogliare o ottenere vantaggi ingiusti. Inoltre, astieniti dal creare dispositivi di redstone che potrebbero causare ritardi nel server e interrompere l'esperienza di tutti.\n- **Sii Gentile:** Tratta gli altri con rispetto ed empatia. Evita il bullismo o l'uso di un linguaggio offensivo. Chiedi sempre il permesso prima di impegnarti in un combattimento giocatore contro giocatore. Ricordati di divertirti e di collaborare all'interno della community SMP di Minecraft per promuovere un ambiente positivo e creativo.")

        var buttonApplicationForm = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Application Form")
            .setCustomId("buttonApplicationFormID")
            .setDisabled(true)

        var rowMinecraftForm = new Discord.MessageActionRow()
            .addComponents(buttonApplicationForm)

        await message.delete()
        await message.channel.send({ embeds: [embedMinecraftForm], components: [rowMinecraftForm] })
    }

    // #details
    if (message.content == "?pandesal-info") {
        var embedPandesalInfo = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setDescription("## <:PinIcon:1188206574922117170> Pandesal SMP Information\nQuesta categoria è riservata esclusivamente ai membri di Pandesal SMP. È uno spazio per la comunicazione, anche se non stai giocando a Minecraft. Ricevi aggiornamenti, notizie e annunci sulla nostra community SMP di Minecraft qui. \n\n- **Server Address:** pandesalmc.aternos.me \n- **Bedrock Port:** 29767")

        var buttonHostingPartner = new Discord.MessageButton()
            .setStyle("LINK")
            .setLabel("Hosting Partner")
            .setURL("https://aternos.org")

        var buttonServerWebsite = new Discord.MessageButton()
            .setStyle("LINK")
            .setLabel("Server Website")
            .setURL("https://pandesalsmp.framer.website")
        
        var rowPandesalInfo = new Discord.MessageActionRow()
            .addComponents(buttonHostingPartner, buttonServerWebsite)

        await message.delete()
        await message.channel.send({ embeds: [embedPandesalInfo], components: [rowPandesalInfo] })
    }

    // @Land Droid
    if (message.content == "<@1057297659087573022>")
        message.reply({ content: "Puoi usare `/` per vedere i comandi" })
})

// Bottoni

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return

    // Application Form
    if (interaction.customId == "buttonApplicationFormID") {
        const modalApplicationForm = new Discord.Modal()
            .setTitle("MinecraftSMP Application Form")
            .setCustomId("modalApplicationFormID")

        const username = new Discord.TextInputComponent()
            .setCustomId("usernameID")
            .setLabel("What is your Minecraft username?")
            .setPlaceholder("Write text here")
            .setStyle("SHORT")
            .setRequired(true)

        const age = new Discord.TextInputComponent()
            .setCustomId("ageID")
            .setLabel("How old are you?")
            .setPlaceholder("Write text here")
            .setStyle("SHORT")
            .setRequired(true)

        const edition = new Discord.TextInputComponent()
            .setCustomId("editionID")
            .setLabel("What edition are you using?")
            .setPlaceholder("Minecraft Java | Bedrock | PE")
            .setStyle("SHORT")
            .setRequired(true)

        const type = new Discord.TextInputComponent()
            .setCustomId("typeID")
            .setLabel("If using Minecraft Java, Premium or Cracked?")
            .setPlaceholder("Minecraft Premium | Cracked | Bedrock")
            .setStyle("SHORT")
            .setRequired(true)

        const motivation = new Discord.TextInputComponent()
            .setCustomId("motivationID")
            .setLabel("Why should we accept you to this SMP?")
            .setPlaceholder("Write text here")
            .setStyle("PARAGRAPH")
            .setRequired(true)

        const rowUsername = new Discord.MessageActionRow()
            .addComponents(username)

        const rowAge = new Discord.MessageActionRow()
            .addComponents(age)

        const rowEdition = new Discord.MessageActionRow()
            .addComponents(edition)

        const rowType = new Discord.MessageActionRow()
            .addComponents(type)

        const rowMotivation = new Discord.MessageActionRow()
            .addComponents(motivation)

        modalApplicationForm.addComponents(rowUsername, rowAge, rowEdition, rowType, rowMotivation);

        await interaction.showModal(modalApplicationForm);
    }

    // Accept
    if (interaction.customId == "buttonAcceptID") {
        const userId = await interaction.message.embeds[0].author.name;
        const player = await interaction.guild.members.fetch(userId);
        const roleSMPMember = "1241094643639259267";

        const channelPandesalTownhall = client.channels.cache.get("1240792965107159080");
        const threadId = await interaction.message.embeds[0].footer.text;
        const thread = await client.channels.cache.get(threadId);

        var buttonAccept = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Accept")
            .setEmoji("<:emoji_circleplus:1012348409769902080>")
            .setCustomId("buttonAcceptID")
            .setDisabled(true)

        var rowAccept = new Discord.MessageActionRow()
            .addComponents(buttonAccept)

        await player.roles.add(roleSMPMember);
        await channelPandesalTownhall.send({ content: `- <@${userId}> si è unito a Pandesal SMP` });
        await interaction.update({ components: [rowAccept] });
        await thread.delete();
    }

    // Deny
    if (interaction.customId == "buttonDenyID") {
        const user = interaction.message.embeds[0].author.name;

        const threadId = await interaction.message.embeds[0].footer.text;
        const thread = await client.channels.cache.get(threadId);

        var embedDeny = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setDescription(`Caro <@${user}>, \n\nGrazie per aver mostrato interesse per il nostro server Minecraft. Purtroppo, dopo un'attenta valutazione della tua richiesta, al momento non siamo in grado di concederti l'accesso al nostro server. Ti invitiamo tuttavia a presentare nuovamente domanda in futuro. \n\nCordiali saluti, \nTeam amministrativo di PandesalSMP`)

        var buttonDeny = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Deny")
            .setEmoji("<:emoji_circlecross:1067128052615753748>")
            .setCustomId("buttonDenyID")
            .setDisabled(true)

        var rowDeny = new Discord.MessageActionRow()
            .addComponents(buttonDeny)

        await interaction.update({ components: [rowDeny] })
        await thread.send({ embeds: [embedDeny] })
    }

    // User Limit
    if (interaction.customId == "buttonUserLimitID") {
        const modalUserLimit = new Discord.Modal()
            .setTitle("Imposta il limiti di utenti")
            .setCustomId("modalUserLimitID")

        const limit = new Discord.TextInputComponent()
            .setCustomId("limitID")
            .setLabel("Inserisci un valore tra 1 e 99")
            .setPlaceholder("Write value here")
            .setStyle("SHORT")
            .setRequired(true)

        const rowLimit = new Discord.MessageActionRow()
            .addComponents(limit)

        modalUserLimit.addComponents(rowLimit);

        await interaction.showModal(modalUserLimit);
    }

    // Private VC
    if (interaction.customId == "buttonPrivateVCID") {
        const voiceChannel = interaction.member.voice.channel;

        if (interaction.channel != voiceChannel)
            await interaction.reply({ content: "Scusa, puoi farlo solo nel tuo canale!", ephemeral: true })
        
        try {
            await voiceChannel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                CONNECT: !voiceChannel.permissionsFor(interaction.guild.roles.everyone).has('CONNECT'),
            });

            const isChannelPublic = interaction.channel.permissionsFor(interaction.guild.roles.everyone).has('CONNECT');
            const privacyStatus = isChannelPublic ? 'Pubblico' : 'Privato';

            return interaction.reply({ content: `<@${interaction.user.id}> ha impostato la visibilità del canale su: ${privacyStatus}`, allowedMentions: { parse: [] } });
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: "Qualcosa è andato storto. Riprova più tardi.", ephemeral: true })
    }
    }
})

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isModalSubmit()) return;

    // Application Form
    if (interaction.customId === "modalApplicationFormID") {
        const channelApplicationForm = client.channels.cache.get("1240733273735434354");

        const username = interaction.fields.getTextInputValue("usernameID");
        const age = interaction.fields.getTextInputValue("ageID");
        const edition = interaction.fields.getTextInputValue("editionID");
        const type = interaction.fields.getTextInputValue("typeID");
        const motivation = interaction.fields.getTextInputValue("motivationID");

        var embedForm1 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .addFields
            (
                { name: "What is your Minecraft username?", value: "```" + username + "```", inline: false },
                { name: "How old are you?", value: "```" + age + "```", inline: false },
                { name: "What edition are you using?", value: "```" + edition + "```", inline: false },
                { name: "If you using Minecraft Java, Premium or Cracked?", value: "```" + type + "```", inline: false },
                { name: "Why should we accept you to this SMP?", value: "```" + motivation + "```", inline: false },
            )

        var buttonAccept = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Accept")
            .setEmoji("<:emoji_circleplus:1012348409769902080>")
            .setCustomId("buttonAcceptID")

        var buttonDeny = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Deny")
            .setEmoji("<:emoji_circlecross:1067128052615753748>")
            .setCustomId("buttonDenyID")

        var rowResponse = new Discord.MessageActionRow()
            .addComponents(buttonAccept, buttonDeny)

        const thread = await interaction.channel.threads.create({
            name: `form-${interaction.user.username}`,
            autoArchiveDuration: 60,
            type: "GUILD_PRIVATE_THREAD"
        })

        var embedForm2 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setAuthor({ name: `${interaction.user.id}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .setFooter({ text: `${thread.id}` })
            .setTimestamp()
            .addFields
            (
                { name: "What is your Minecraft username?", value: "```" + username + "```", inline: false },
                { name: "How old are you?", value: "```" + age + "```", inline: false },
                { name: "What edition are you using?", value: "```" + edition + "```", inline: false },
                { name: "If you using Minecraft Java, Premium or Cracked?", value: "```" + type + "```", inline: false },
                { name: "Why should we accept you to this SMP?", value: "```" + motivation + "```", inline: false },
            )

        await thread.members.add(interaction.user.id);
        await interaction.reply({ content: `Il modulo di domanda è stato inviato! <#${thread.id}>`, ephemeral: true });
        await thread.send({ embeds: [embedForm1] });
        await channelApplicationForm.send({ embeds: [embedForm2], components: [rowResponse] });
    }
    
    // User Limit
    if (interaction.customId === "modalUserLimitID") {
        const limit = interaction.fields.getTextInputValue("limitID");

        await interaction.channel.setUserLimit(limit);
        await interaction.reply({ content: `<@${interaction.user.id}> ha impostato il limite di utenti su: ${limit}`, allowedMentions: { parse: [], }});
    }

    // Report
    if (interaction.customId === "modalReportID") {
        const channelReport = client.channels.cache.get("1242868677473341572");

        const object = interaction.fields.getTextInputValue("objectID");
        const description = interaction.fields.getTextInputValue("descriptionID");

        var embedReport =  new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .setTimestamp()
            .addFields
            (
                { name: "Object:", value: "```" + object + "```", inline: false },
                { name: "Description:", value: "```" + description + "```", inline: false },
            )

        var embedResponse = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setDescription("<:CheckIcon:1129846699150561461> L'utente è stato segnalato. Grazie per la tua segnalazione!")

        await interaction.reply({ embeds: [embedResponse], ephemeral: true })
        await channelReport.send({ embeds: [embedReport] })
    }
})

// Vocale

var voiceManager = new Discord.Collection()

client.on("voiceStateUpdate", async (oS, nS) => {
    const { member, guild } = oS;
    const newChannel = nS.channel;
    const oldChannel = oS.channel;
    const JTC = "1186100330669293588";

    var buttonUserLimit = new Discord.MessageButton()
        .setStyle("SECONDARY")
        .setLabel("User Limit")
        .setEmoji("<:emoji_person:1005010359024877598>")
        .setCustomId("buttonUserLimitID")

    var buttonPrivateVC = new Discord.MessageButton()
        .setStyle("SECONDARY")
        .setLabel("Private VC")
        .setEmoji("<:emoji_lock:1081997893189238864>")
        .setCustomId("buttonPrivateVCID")

    var rowVC = new Discord.MessageActionRow()
        .addComponents(buttonUserLimit, buttonPrivateVC)

    if (oldChannel !== newChannel && newChannel && newChannel.id === JTC) {
        const voiceChannel = await guild.channels.create(
            `${member.user.username}`,
            {
                type: "GUILD_VOICE",
                parent: newChannel.parent,
                permissionOverwrites:
                    [
                        { id: member.id, allow: ["CONNECT", "MOVE_MEMBERS"] },
                        { id: guild.id, allow: ["CONNECT"] },
                    ],
            });

        await voiceChannel.send({ content: "Gestisci il tuo canale vocale qui", components: [rowVC] });
        await voiceManager.set(member.id, voiceChannel.id);
        await newChannel.permissionOverwrites.edit(member, { CONNECT: true } );

        setTimeout(() => {
            newChannel.permissionOverwrites.delete(member);
        }, 30 * 1000);

        return setTimeout(() => {
            member.voice.setChannel(voiceChannel);
        }, 600);
    }

    const JTCCHANNEL = voiceManager.get(member.id);
    const members = oldChannel?.members.filter((m) => !m.user.bot).map((m) => m.id);

    if (JTCCHANNEL && oldChannel.id === JTCCHANNEL && (!newChannel || newChannel.id !== JTCCHANNEL)) {
        if (members.length > 0)
        {
            var randomID = members[Math.floor(Math.random() * members.length)];
            var randomMember = guild.members.cache.get(randomID);
            randomMember.voice.setChannel(oldChannel);
            oldChannel.permissionOverwrites.edit(randomMember, { CONNECT: true, MANAGE_CHANNELS: true } );

            voiceManager.set(member.id, null);
            voiceManager.set(randomMember.id, oldChannel.id);
        }
        else
        {
            voiceManager.set(member.id, null);
            oldChannel.delete().catch((e) => null);
        }
    }
});

// Join

client.on("guildMemberAdd", async (member) => {
    const ROLE_ID = "1140360510978662430";
    const roleLandCitizen = member.guild.roles.cache.get(ROLE_ID);

    if (roleLandCitizen)
        member.roles.add(roleLandCitizen)
})
