const Discord = require("discord.js")
const client = new Discord.Client({
     intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_INTEGRATIONS", "GUILD_PRESENCES"] 
})

// Slash Commands + Status

client.on('ready', () => {
    client.user.setStatus("online");
    client.user.setActivity("Land Citizens", { type: "LISTENING" });

    client.guilds.cache.forEach(guild => {
        guild.commands.create({
            name: "help",
            description: "Chiedi aiuto sui miei comandi"
        })

        guild.commands.create({
            name: "memberinfo",
            description: "Ottieni le informazioni sull'utente selezionato",
            options: [
                {
                    name: "user",
                    description: "Le informazioni sull'utente da mostrare",
                    type: "USER",
                    required: false
                }
            ]
        })

        guild.commands.create({
            name: "ping",
            description: "Ottieni il ping del Bot"
        })

        guild.commands.create({
            name: "serverinfo",
            description: "Ottieni le informazioni su DARK3R's Land"
        })

        guild.commands.create({
            name: "sourcecode",
            description: "Ottieni il mio Codice Sorgente su GitHub"
        })
    })
})

// Comandi

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return

    if (interaction.commandName == "help") {
        var embedHelp = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setDescription("<:IconDot:1100515652457992234> **Aiuto su /memberinfo** \nQuesto comando mostra le informazioni sul membro selezionato. Queste informazioni includono: Username, ID, Data di Creazione e Data di Unione \n\n<:IconDot:1100515652457992234> **Aiuto su /ping** \nQuesto comando mostra il Ping di Land Droid \n\n<:IconDot:1100515652457992234> **Aiuto su /serverinfo** \nQuesto comando mostra le informazioni sul server. Queste informazioni includono: Nome, Membri Totali, Nitro Boost, Livello del Server e Data di Rilascio \n\n<:IconDot:1100515652457992234> **Comando Source Code** \nQuesto comando mostra il link della Repository di GitHub per Land Droid")

        interaction.reply({ embeds: [embedHelp] })
    }

    if (interaction.commandName == "memberinfo") {
        const utente = interaction.options.member ? interaction.options.getUser(member) : interaction.member
        var embedMemberinfo = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setThumbnail(utente.user.avatarURL())
            .setDescription(`<:IconDot:1100515652457992234> **Username:** ${interaction.user.tag} \n<:IconDot:1100515652457992234> **User ID:** ${interaction.user.id} \n<:IconDot:1100515652457992234> **Joined at:** <t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:D> \n<:IconDot:1100515652457992234> **Created at:** <t:${Math.floor(interaction.user.createdTimestamp / 1000)}:D>`)

        interaction.reply({ embeds: [embedMemberinfo] })
    }

    if (interaction.commandName == "ping") {
        var embedPing = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setAuthor({ name:"Land Droid#8824", iconURL: "https://cdn.discordapp.com/avatars/1057297659087573022/74e3f481a38d7fe45d4d190427154f52.png?size=1024"})
            .setDescription(`<:IconDot:1100515652457992234> **Battito Cardiaco:** ${client.ws.ping}ms`)

        interaction.reply({ embeds: [embedPing] })
    }

    if (interaction.commandName == "serverinfo") {
        var server = interaction.guild;
        var embedServerinfo = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setThumbnail(server.iconURL({ dynamic: true }))
            .setDescription(`<:IconDot:1100515652457992234> **Server Name:** ${interaction.guild.name} \n<:IconDot:1100515652457992234> **Total Members:** ${interaction.guild.memberCount} Membri \n<:IconDot:1100515652457992234> **Nitro Boosts:** ${interaction.guild.premiumSubscriptionCount} Boosts \n<:IconDot:1100515652457992234> **Server Level:** Level ${interaction.guild.premiumTier} \n<:IconDot:1100515652457992234> **Date Released:** <t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:D>`)
        
        interaction.reply({ embeds: [embedServerinfo] })
    }

    if (interaction.commandName == "sourcecode") {
        interaction.reply({ content: "https://github.com/thomasmolteni/landdroid" })
    }
})

// Embed

client.on("messageCreate", async (message) => {
    // #information
    if (message.content == "?information") {
        var embedInformation1 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077708711449083956/Information.png?width=1440&height=359")

        var embedInformation2 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setDescription("<:IconDot:1100515652457992234> **Benvenuto sul DARK3R's Official Discord Server!** \nGrazie mille per esserti unito. Questo server è completamente basato su DARK3R per consentire ai suoi seguaci e amici di comunicare tra loro. \n\n<:IconDot:1100515652457992234> **Server Information** \n<:ReplyContinued:1022586643506528336> Owned by: <@709672125354606592> \n<:Reply:1022586641908514966> Release Date: <t:1598476740:D>")

        var buttonServerRules = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Server Rules")
            .setEmoji("<:emoji_rules:1005004300763811862>")
            .setCustomId("buttonServerRulesID")

        var buttonAssignRoles = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Assign Roles")
            .setEmoji("<:emoji_paint:1009852243610194021>")
            .setCustomId("buttonAssignRolesID")

        var buttonGetStarted = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Get Started")
            .setEmoji("<:emoji_backpack:1005010361570820096>")
            .setCustomId("buttonGetStartedID")

        var rowInformation = new Discord.MessageActionRow()
            .addComponents(buttonServerRules, buttonAssignRoles, buttonGetStarted)

        message.channel.send({ embeds: [embedInformation1, embedInformation2], components: [rowInformation] })
    }

    // #create-tickets
    if (message.content == "?create-tickets") {
        var embedCreateTickets1 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077708981142827149/Create_Tickets.png?width=1440&height=359")

        var embedCreateTickets2 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setDescription("<:IconDot:1100515652457992234> **Crea un Support Tickets** \nSe hai un problema e hai bisogno di aiuto, crea un ticket in modo che i moderatori possano aiutarti. Se crei un ticket senza motivo, verrai avvisato. \n\n<:IconDot:1100515652457992234> **Puoi creare un ticket per...** \n<:ReplyContinued:1022586643506528336> Segnalare un Membro \r<:ReplyContinued:1022586643506528336> Segnalare un Bug del Server \r<:ReplyContinued:1022586643506528336> Reclamare il tuo Ruolo \r<:Reply:1022586641908514966> Chiedere qualcosa di Importante")
        
        var buttonAskQuestions = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Ask Questions")
            .setEmoji("<:emoji_personheadphones:1012423827499778209>")
            .setCustomId("buttonAskQuestionsID")
        
        var buttonReportUsers = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Report Users")
            .setEmoji("<:emoji_personmessage:1012423829152346143>")
            .setCustomId("buttonReportUsersID")

        var buttonOtherConcerns = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Other Concerns")
            .setEmoji("<:emoji_mail:1010906227007574046>")
            .setCustomId("buttonOtherConcernsID")

        var rowCreateTickets = new Discord.MessageActionRow()
            .addComponents(buttonAskQuestions, buttonReportUsers, buttonOtherConcerns)

        message.channel.send({ embeds: [embedCreateTickets1, embedCreateTickets2], components: [rowCreateTickets] })
    }

    // Ping
        // @DARK3R
    var ping = ["<@709672125354606592>"]
    var trovata = false;

    ping.forEach(parola => {
        if (message.content.includes(parola)) {
            trovata = true;
        }
    })

    if (trovata) {
        message.reply("DARK3R risponderà tra un momento, per favore spiega il motivo per cui lo hai menzionato. Se l'hai già fatto, fantastico!")
    }

    // Ping
        // @Land Droid
    var ping2 = ["<@1057297659087573022>"]
    var trovata2 = false;

    ping2.forEach(parola => {
        if (message.content.includes(parola)) {
            trovata2 = true;
        }
    })

    if (trovata2) {
        message.reply("Puoi usare `/` per vedere i comandi")
    }

    // Ping
        // @Discord Mod
    var ping3 = ["<@&1100180052051763230>"]
    var trovata3 = false;

    ping3.forEach(parola => {
        if (message.content.includes(parola)) {
            trovata3 = true;
        }
    })

    if (trovata3) {
        message.reply("Se hai bisogno di aiuto dai moderatori, crea un ticket nel canale <#1097996541387620352>")
    }
})

// Bottoni

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return

    // Server Rules
    if (interaction.customId == "buttonServerRulesID") {
        var embedServerRules1 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077718925984411768/Server_Rules.png?width=1440&height=359")

        var embedServerRules2 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setDescription("<:IconDot:1100515652457992234> **1. Rispetta ogni Membro** \nRispetta tutti i membri su questo server, trattali allo stesso modo rispettivamente indipendentemente dalla tua fede religiosa e opponiti a simpatie e antipatie. Tratta sempre gli altri con il rispetto che vuoi avere in cambio. \n\n<:IconDot:1100515652457992234> **2. No Spamming** \nNon devi spammare nulla sul server, che si tratti di un messaggio, emoji, immagini o qualsiasi cosa necessaria o non necessaria. Ti è proibito, nemmeno erroneamente, compiere tali atti. Dai una possibilità agli altri membri. \n\n<:IconDot:1100515652457992234> **3. No Contenuti Innapropriati/NSFW** \nQuesto server Discord è per persone di tutte le età. I contenuti sessuali sono severamente vietati. Aiutaci a far crescere una comunità familiare. \n\n<:IconDot:1100515652457992234> **4. Usa le Immagini del Profilo e i Soprannomi Appropriati** \nNon consentiamo ai membri di utilizzare soprannomi offensivi, immagini del profilo inadeguate, ad es. sessuale o offensivo per religiosi, politici, ecc. Inoltre, se i nostri moderatori scoprono qualcuno che ha questo, hanno il diritto di cambiare soprannome e cacciare se tu non ascoltare l'avvertimento. \n\n<:IconDot:1100515652457992234> **5. Segui i ToS & le Linee Guida di Discord** \nOltre alle regole di questo server, dai un'occhiata ai Termini di servizio e alle linee guida della community di Discord ufficiali. \n\n<:IconDot:1100515652457992234> **Note Importanti** \nLa tua presenza in questo server implica l'accettazione di queste e tutte le altre regole, comprese tutte le ulteriori modifiche. Queste modifiche possono essere apportate in qualsiasi momento senza preavviso, è tua responsabilità verificarle. Usa il buon senso e astieniti dal lamentarti quando <@&1100180052051763230> tenta di mantenere un ambiente calmo e sicuro nel server.")

        const buttonTerms = new Discord.MessageButton()
            .setStyle("LINK")
            .setLabel("Discord's Terms of Services")
            .setURL("https://discord.com/terms")

        const buttonGuidelines = new Discord.MessageButton()
            .setStyle("LINK")
            .setLabel("Discord Community Guidelines")
            .setURL("https://discord.com/guidelines")

        var rowLinks = new Discord.MessageActionRow()
            .addComponents(buttonTerms, buttonGuidelines)

        interaction.reply({ embeds: [embedServerRules1, embedServerRules2], components: [rowLinks], ephemeral: true })
    }

    // Assign Roles
    if (interaction.customId == "buttonAssignRolesID") {
        var embedAssignRoles1 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077709082884050964/Assign_Roles.png?width=1440&height=359")

        var embedAssignRoles2 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setDescription("<:IconDot:1100515652457992234> **Assign Ping Roles** \nPer assicurarti di ricevere notifiche solo per gli argomenti che desideri conoscere. Puoi scegliere più ruoli se lo desideri. Si prega gentilmente di scegliere quando o in quale occasione si desidera ricevere il ping. \n\n<:IconDot:1100515652457992234> **Nota su Land Droid** \nSe premi uno dei pulsanti e non viene visualizzato alcun messaggio, il bot potrebbe essere offline, quindi riprova più tardi. Grazie!")

        var buttonNews = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("News Ping")
            .setEmoji("<:emoji_news:1005004305385926716>")
            .setCustomId("buttonNewsID")

        var buttonContent = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Content Ping")
            .setEmoji("<:emoji_contents:1005004303121010749>")
            .setCustomId("buttonContentID")

        var buttonAll = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("All Pings")
            .setEmoji("<:emoji_bell:1005014186843193395>")
            .setCustomId("buttonAllID")

        var rowRoles = new Discord.MessageActionRow()
            .addComponents(buttonNews, buttonContent, buttonAll)

        interaction.reply({ embeds: [embedAssignRoles1, embedAssignRoles2], components: [rowRoles], ephemeral: true })
    }

    // Get Started
        // Page 1 - Roles Info
    if (interaction.customId == "buttonGetStartedID") {   
        var embedRolesInfo1 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077709040886501396/Roles_Info.png?width=1440&height=359")

        var embedRolesInfo2 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setDescription("<:IconDot:1100515652457992234> **Server Roles Information** \nQuali sono i ruoli del server, cosa fanno e come li ottieni? \n\n<@&1099456728451514439> \nI Bot Discord personalizzati che DARK3R ha creato appositamente per questo server. Questo ruolo non può essere ottenuto. \n\n<@&1100180052051763230> \nMantengono la pace in tutto il server e aiutano i membri se hanno un problema. Non sono perfetti, quindi possono anche commettere errori. Questo ruolo viene assegnato solo a persone fidate dagli Amministratori. \n\n<@&1100355896611180605> \nSono utili intelligenze artificiali che possono eseguire automaticamente diverse attività utili sul nostro server. Ciò include vietare i piantagrane, moderare la discussione, riprodurre musica sul nostro server e così via.")

        var buttonPreviousPage1 = new Discord.MessageButton()   
            .setStyle("SECONDARY")
            .setLabel("Previous Page")
            .setEmoji("<:emoji_previous:1005026535394250782>")
            .setCustomId("buttonPreviousPage1ID")
            .setDisabled(true)

        var buttonNextPage1 = new Discord.MessageButton()   
            .setStyle("SECONDARY")
            .setLabel("Next Page")
            .setEmoji("<:emoji_next:1005026537789202452>")
            .setCustomId("buttonNextPage1ID")

        var rowPage1 = new Discord.MessageActionRow()
            .addComponents(buttonPreviousPage1, buttonNextPage1)

        interaction.reply({ embeds: [embedRolesInfo1, embedRolesInfo2], components: [rowPage1], ephemeral: true })
    }

    if (interaction.customId == "buttonPreviousPage2ID") {
        var embedRolesInfo1 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077709040886501396/Roles_Info.png?width=1440&height=359")

        var embedRolesInfo2 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setDescription("<:IconDot:1100515652457992234> **Server Roles Information** \nQuali sono i ruoli del server, cosa fanno e come li ottieni? \n\n<@&1099456728451514439> \nI Bot Discord personalizzati che DARK3R ha creato appositamente per questo server. Questo ruolo non può essere ottenuto. \n\n<@&1100180052051763230> \nMantengono la pace in tutto il server e aiutano i membri se hanno un problema. Non sono perfetti, quindi possono anche commettere errori. Questo ruolo viene assegnato solo a persone fidate dagli Amministratori. \n\n<@&1100355896611180605> \nSono utili intelligenze artificiali che possono eseguire automaticamente diverse attività utili sul nostro server. Ciò include vietare i piantagrane, moderare la discussione, riprodurre musica sul nostro server e così via.")

        var buttonPreviousPage1 = new Discord.MessageButton()   
            .setStyle("SECONDARY")
            .setLabel("Previous Page")
            .setEmoji("<:emoji_previous:1005026535394250782>")
            .setCustomId("buttonPreviousPage1ID")
            .setDisabled(true)

        var buttonNextPage1 = new Discord.MessageButton()   
            .setStyle("SECONDARY")
            .setLabel("Next Page")
            .setEmoji("<:emoji_next:1005026537789202452>")
            .setCustomId("buttonNextPage1ID")

        var rowPage1 = new Discord.MessageActionRow()
            .addComponents(buttonPreviousPage1, buttonNextPage1)

        interaction.update({ embeds: [embedRolesInfo1, embedRolesInfo2], components: [rowPage1], ephemeral: true })
    }

    // Get Started
        // Page 2 - Roles Info
    if (interaction.customId == "buttonNextPage1ID" || interaction.customId == "buttonPreviousPage3ID") {
        var embedRolesInfo3 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077709040886501396/Roles_Info.png?width=1440&height=359")

        var embedRolesInfo4 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setDescription("<@&1100356406680502334> \nSono i sostenitori sulla pagina Facebook di DARK3R. Puoi ottenere questo ruolo se acquisti un badge di sostenitore. Se il canale YouTube di DARK3R ha un abbonamento, puoi ottenerlo anche lì quando ti iscrivi. \n\n<@&988436752278646825> \nSono le persone più ricche e fantastiche dell'intero server. A causa del loro Boost, il server può sbloccare vari vantaggi. Discord darà loro anche un'icona Boost accanto al loro nome su questo server. Questo ruolo può essere ottenuto potenziando il server. \n\n<@&1100177512081920070> \nSono i membri che giocano sul server Minecraft chiamato PandesalSMP. Hanno accesso ai canali PandesalSMP e al server Minecraft. Questo ruolo può essere ottenuto compilando il modulo Minecraft. \n\n <@&748109416322301964> \nI membri con questo ruolo hanno accesso a tutti i canali sul server (esclusi i canali privati). Questo ruolo lo ottieni quando entri nel server.")

        var buttonPreviousPage2 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Previous Page")
            .setEmoji("<:emoji_previous:1005026535394250782>")
            .setCustomId("buttonPreviousPage2ID")

        var buttonNextPage2 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Next Page")
            .setEmoji("<:emoji_next:1005026537789202452>")
            .setCustomId("buttonNextPage2ID")

        var rowPage2 = new Discord.MessageActionRow()
            .addComponents(buttonPreviousPage2, buttonNextPage2)

        interaction.update({ embeds: [embedRolesInfo3, embedRolesInfo4], components: [rowPage2], ephemeral: true })
    }

    // Get Started
        // Page 3 - Content Role
    if (interaction.customId == "buttonNextPage2ID" || interaction.customId == "buttonPreviousPage4ID") {
        var embedContentRole1 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077709020242128906/Content_Role.png?width=1440&height=359")

        var embedContentRole2 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setDescription("<:IconDot:1100515652457992234> **Content Creators Role** \n<@&1100180049933635585> creano attivamente contenuti diversi per i propri follower. Sono Youtuber, Facebook Streamer, Twitch Streamer e così via. Questo ruolo può essere ottenuto se soddisfi i requisiti per i creatori di contenuti. \n\n<:IconDot:1100515652457992234> **Come ottenere il ruolo Content Creator?** \nDevi essere attivamente in streaming, caricare video o pubblicare sulla tua pagina o canale. Condividi il link della tua pagina o del tuo canale in <#1100174848518537307>, se possibile.")
            .addFields
            (
                { name: "YouTubers:", value: "⇀ Oltre 1 000 Iscritti \n⇀ Oltre 10 000 Views \n⇀ Account collegato all'account Discord", inline: true },
                { name: "Twitch Streamers:", value: "⇀ Affiliazione Twitch \n⇀ Oltre 100 Followers \n⇀ Account collegato all'account Discord", inline: true },
                { name: "Facebook Streamers:", value: "⇀ Level Up Streamer \n⇀ Oltre 100 Followers \n⇀ Se possibile avere il collegamento alla pagina", inline: true },
            )

        var buttonPreviuosPage3 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Previous Page")
            .setEmoji("<:emoji_previous:1005026535394250782>")
            .setCustomId("buttonPreviousPage3ID")

        var buttonNextPage3 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Next Page")
            .setEmoji("<:emoji_next:1005026537789202452>")
            .setCustomId("buttonNextPage3ID")

        var rowPage3 = new Discord.MessageActionRow()
            .addComponents(buttonPreviuosPage3, buttonNextPage3)

        interaction.update({ embeds: [embedContentRole1, embedContentRole2], components: [rowPage3], ephemeral: true })
    }

    // Get Started
        // Page 4 - Create Tickets
    if (interaction.customId == "buttonNextPage3ID" || interaction.customId == "buttonPreviousPage5ID") {
        var embedCreateTickets1 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077708981142827149/Create_Tickets.png?width=1440&height=359")

        var embedCreateTickets2 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setDescription("<:IconDot:1100515652457992234> **Crea un Support Tickets** \nSe hai un problema e hai bisogno di aiuto, vai su <#1097996541387620352> e crea un ticket in modo che i moderatori possano aiutarti. Se crei un ticket senza motivo, verrai avvisato. \n\n<:IconDot:1100515652457992234> **Puoi creare un ticket per...** \n<:ReplyContinued:1022586643506528336> Segnalare un Membro \r<:ReplyContinued:1022586643506528336> Segnalare un Bug del Server \r<:ReplyContinued:1022586643506528336> Reclamare il tuo Ruolo \r<:Reply:1022586641908514966> Chiedere qualcosa di Importante")
        
        var buttonPreviousPage4 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Previous Page")
            .setEmoji("<:emoji_previous:1005026535394250782>")
            .setCustomId("buttonPreviousPage4ID")

        var buttonNextPage4 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Next Page")
            .setEmoji("<:emoji_next:1005026537789202452>")
            .setCustomId("buttonNextPage4ID")

        var rowPage4 = new Discord.MessageActionRow()
            .addComponents(buttonPreviousPage4, buttonNextPage4)
        
        interaction.update({ embeds: [embedCreateTickets1, embedCreateTickets2], components: [rowPage4], ephemeral: true })
    }

    // Get Started
        // Page 5 - Hooray!
    if (interaction.customId == "buttonNextPage4ID") {
        var embedHooray1 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077709005482360913/Hooray.png?width=1440&height=359")

        var embedHooray2 = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setDescription("<:IconDot:1100515652457992234> **Hooray... Ce l'hai fatta!** \nAncora una volta, benvenuto in DARK3R's Land. Ora puoi inviare un messaggio in <#960536198143676496> e presentarti. Se non vedi questo canale, potresti non essere ancora verificato.")

        var buttonPreviousPage5 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Previous Page")
            .setEmoji("<:emoji_previous:1005026535394250782>")
            .setCustomId("buttonPreviousPage5ID")

        var buttonNextPage5 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Next Page")
            .setEmoji("<:emoji_next:1005026537789202452>")
            .setCustomId("buttonNextPage5ID")
            .setDisabled(true)

        var rowPage5 = new Discord.MessageActionRow()
            .addComponents(buttonPreviousPage5, buttonNextPage5)

        interaction.update({ embeds: [embedHooray1, embedHooray2], components: [rowPage5], ephemeral: true })
    }

    // Assegnazione Ruoli
    if (interaction.customId == "buttonNewsID") {
        interaction.deferUpdate()

        await interaction.member.roles.add("1100367628574400604")
        await interaction.followUp({ content: "Gave you the <@&1100367628574400604> role!", ephemeral: true })
    }

    if (interaction.customId == "buttonNewsID") {
        interaction.deferUpdate()
    
        await interaction.member.roles.add("1100367636975587399")
        await interaction.followUp({ content: "Gave you the <@&1100367636975587399> role!", ephemeral: true })
    }

    if (interaction.customId == "buttonAllID") {
        interaction.deferUpdate()
    
        await interaction.member.roles.add("1100367628574400604")
        await interaction.followUp({ content: "Gave you the <@&1100367628574400604> and <@&1100367636975587399> roles!", ephemeral: true })
    }

    // Ask Questions
    if (interaction.customId == "buttonAskQuestionsID") {
        await interaction.deferUpdate()

        const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone")

        interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
            type: "GUILD_TEXT",
            parent: "1100161926929068072",
            topic: interaction.user.id,
            permissionOverwrites:
            [
                { id: interaction.user.id, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"] },
                { id: everyone.id, deny: ["VIEW_CHANNEL", "SEND_MESSAGES"] }
            ]
        }).then(c => {
            var embedAskQuestions = new Discord.MessageEmbed()
                .setColor("cecece")
                .setDescription("**Ticket Creato!** \nSi prega di fornire alcuni dettagli in attesa della risposta. Grazie!")
                .setFooter({ text: "Categoria: Ask Questions" })

            var buttonCloseTicket = new Discord.MessageButton()
                .setStyle("SECONDARY")
                .setLabel("Close Ticket")
                .setEmoji("<:emoji_logout:1011132089774657587>")
                .setCustomId("buttonCloseTicketID")

            var buttonDeleteTicket = new Discord.MessageButton()
                .setStyle("SECONDARY")
                .setLabel("Delete Ticket")
                .setEmoji("<:emoji_trash:1010906896762408970>")
                .setCustomId("buttonDeleteTicketID")

            var rowAskQuestions = new Discord.MessageActionRow()
                .addComponents(buttonCloseTicket, buttonDeleteTicket)

            c.send({ content: `${interaction.user}`, embeds: [embedAskQuestions], components: [rowAskQuestions] })
        })

        interaction.followUp({ content: `Ticket Creato! #ticket-${interaction.user.username}`, ephemeral: true })
    }

    // Report Users
    if (interaction.customId == "buttonReportUsersID") {
        await interaction.deferUpdate()

        const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone")

        interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
            type: "GUILD_TEXT",
            parent: "1100161926929068072",
            topic: interaction.user.id,
            permissionOverwrites:
            [
                { id: interaction.user.id, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"] },
                { id: everyone.id, deny: ["VIEW_CHANNEL", "SEND_MESSAGES"] }
            ]
        }).then(c => {
            var embedReportUsers = new Discord.MessageEmbed()
                .setColor("cecece")
                .setDescription("**Ticket Creato!** \nSi prega di fornire alcuni dettagli in attesa della risposta. Grazie!")
                .setFooter({ text: "Categoria: Report Users" })

            var buttonCloseTicket = new Discord.MessageButton()
                .setStyle("SECONDARY")
                .setLabel("Close Ticket")
                .setEmoji("<:emoji_logout:1011132089774657587>")
                .setCustomId("buttonCloseTicketID")

            var buttonDeleteTicket = new Discord.MessageButton()
                .setStyle("SECONDARY")
                .setLabel("Delete Ticket")
                .setEmoji("<:emoji_trash:1010906896762408970>")
                .setCustomId("buttonDeleteTicketID")

            var rowReportUsers = new Discord.MessageActionRow()
                .addComponents(buttonCloseTicket, buttonDeleteTicket)

            c.send({ content: `${interaction.user}`, embeds: [embedReportUsers], components: [rowReportUsers] })
        })

        interaction.followUp({ content: `Ticket Creato! #ticket-${interaction.user.username}`, ephemeral: true })
    }

    // Other Concerns
    if (interaction.customId == "buttonOtherConcernsID") {
        await interaction.deferUpdate()

        const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone")

        interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
            type: "GUILD_TEXT",
            parent: "1100161926929068072",
            topic: interaction.user.id,
            permissionOverwrites:
            [
                { id: interaction.user.id, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"] },
                { id: everyone.id, deny: ["VIEW_CHANNEL", "SEND_MESSAGES"] }
            ]
        }).then(c => {
            var embedOtherConcerns = new Discord.MessageEmbed()
                .setColor("cecece")
                .setDescription("**Ticket Creato!** \nSi prega di fornire alcuni dettagli in attesa della risposta. Grazie!")
                .setFooter({ text: "Categoria: Other Concerns" })

            var buttonCloseTicket = new Discord.MessageButton()
                .setStyle("SECONDARY")
                .setLabel("Close Ticket")
                .setEmoji("<:emoji_logout:1011132089774657587>")
                .setCustomId("buttonCloseTicketID")

            var buttonDeleteTicket = new Discord.MessageButton()
                .setStyle("SECONDARY")
                .setLabel("Delete Ticket")
                .setEmoji("<:emoji_trash:1010906896762408970>")
                .setCustomId("buttonDeleteTicketID")

            var rowOtherConcerns = new Discord.MessageActionRow()
                .addComponents(buttonCloseTicket, buttonDeleteTicket)

            c.send({ content: `${interaction.user}`, embeds: [embedOtherConcerns], components: [rowOtherConcerns] })
        })

        interaction.followUp({ content: `Ticket Creato! #ticket-${interaction.user.username}`, ephemeral: true })
    }

    // Close & Delete Ticket
    if (interaction.customId == "buttonDeleteTicketID" || interaction.customId == "buttonCloseTicketID") {
        await interaction.reply({ content: "Chiusura ticket in alcuni secondi", ephemeral: true })

        setTimeout(async function() {
            await interaction.channel.delete();
        }, 5000)
    }
})